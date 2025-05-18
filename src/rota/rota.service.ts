import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rota } from './rota.entity';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateLinhaDto } from 'src/linha/dto/update-linha.dto';
import { Linha } from 'src/linha/linha.entity';

@Injectable()
export class RotaService {
    constructor(
        @InjectRepository(Rota)
        private rotaRepository: Repository<Rota>,

        @InjectRepository(Linha)
        private linhaRepository: Repository<Linha>,
    ) {}

    async create(dto: CreateRotaDto) {
        const linha = await this.linhaRepository.findOne({ where: { id: dto.linha_id } });

        if (!linha) {
            throw new NotFoundException('Linha não encontrada');
        }

        const novaRota = this.rotaRepository.create({
            nome: dto.nome,
            linha,
            pontos: dto.pontos
        });

        return this.rotaRepository.save(novaRota);
    }

    findAll() {
        return this.rotaRepository.find({
            relations: ['linha']
        });
    }

    findOne(id: number) {
        return this.rotaRepository.findOne({
            where: { id },
            relations: ['linha'],
        });
    }

    update(id: number, dto: UpdateLinhaDto) {
        return this.rotaRepository.update(id, dto);
    }

    remove(id: number) {
        return this.rotaRepository.delete(id);
    }
}
