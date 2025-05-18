import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Onibus } from './onibus.entity';
import { Repository } from 'typeorm';
import { Linha } from 'src/linha/linha.entity';
import { Rota } from 'src/rota/rota.entity';
import { CreateOnibusDto } from './dto/create-onibus.dto';
import { UpdateOnibusDto } from './dto/update-onibus.dto';

@Injectable()
export class OnibusService {
    constructor(
        @InjectRepository(Onibus)
        private readonly onibusRepo: Repository<Onibus>,
        @InjectRepository(Linha)
        private readonly linhaRepo: Repository<Linha>,
        @InjectRepository(Rota)
        private readonly rotaRepo: Repository<Rota>,
    ) {}

    async create(createOnibusDto: CreateOnibusDto): Promise<Onibus> {
    const { codigo, linhaId, lat, lng, rotaId } = createOnibusDto;

    const exists = await this.onibusRepo.findOne({ where: { codigo } });
    if (exists) {
        throw new ConflictException('Ônibus com este código já existe');
    }

    const linha = await this.linhaRepo.findOne({ where: { id: linhaId } });
    if (!linha) {
        throw new NotFoundException("Linha não encontrada");
    }

    let rota: Rota | undefined;
    if (rotaId) {
        const rotaResult = await this.rotaRepo.findOne({ where: { id: rotaId, linha: { id: linhaId } } });
        if (!rotaResult) {
            throw new NotFoundException("Rota não encontrada ou não pertence à linha");
        }
        rota = rotaResult;
    }

    const onibus = this.onibusRepo.create({
        codigo,
        lat,
        lng,
        linha,
        rota,
    });

    return this.onibusRepo.save(onibus);
    }

    async update(id: number, updateOnibusDto: UpdateOnibusDto): Promise<Onibus> {
    // Adicione relations: ['linha'] para carregar a relação linha
    const onibus = await this.onibusRepo.findOne({ 
        where: { id },
        relations: ['linha'], // Corrige o erro
    });
    if (!onibus) {
        throw new NotFoundException('Ônibus não encontrado');
    }

    // Verifica se o novo código já existe (se fornecido)
    if (updateOnibusDto.codigo && updateOnibusDto.codigo !== onibus.codigo) {
        const exists = await this.onibusRepo.findOne({ where: { codigo: updateOnibusDto.codigo } });
        if (exists) {
            throw new ConflictException('Ônibus com este código já existe');
        }
    }

    // Verifica se a nova linha existe (se fornecida)
    if (updateOnibusDto.linhaId) {
        const linha = await this.linhaRepo.findOne({ where: { id: updateOnibusDto.linhaId } });
        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }
        onibus.linha = linha;
    }

    // Verifica se a nova rota existe e pertence à linha (se fornecida)
    if (updateOnibusDto.rotaId) {
        const linhaId = updateOnibusDto.linhaId || onibus.linha.id;
        const rota = await this.rotaRepo.findOne({ where: { id: updateOnibusDto.rotaId, linha: { id: linhaId } } });
        if (!rota) {
            throw new NotFoundException('Rota não encontrada ou não pertence à linha');
        }
        onibus.rota = rota;
    }

    Object.assign(onibus, updateOnibusDto);
    return this.onibusRepo.save(onibus);
}

    async findAll(): Promise<Onibus[]> {
        return this.onibusRepo.find({ relations: ['linha', 'rota']})
    }

    async findOne(id: number): Promise<Onibus> {
        const onibus = await this.onibusRepo.findOne({ where: { id }, relations: ['linha', 'rota' ]});
        if (!onibus) {
            throw new NotFoundException("Ônibus não encontrado");
        }
        return onibus;
    }

}
