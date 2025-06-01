import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from './linha.entity';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';

@Injectable()
export class LinhaService {
    constructor(
        @InjectRepository(Linha)
        private linhaRepository: Repository<Linha>,
    ) {}

    async findAll(): Promise<Linha[]> {
        return this.linhaRepository.find();
    }

    async findOne(id: number): Promise<Linha> {
        const linha = await this.linhaRepository.findOneBy({ id });
        if (!linha) {
            throw new NotFoundException(`Linha com id ${id} não encontrada`);
        }
        return linha;
    }

    async create(createLinhaDto: CreateLinhaDto): Promise<Linha> {
        const exists = await this.linhaRepository.findOneBy({ nome: createLinhaDto.nome });
        if (exists) {
            throw new BadRequestException(`Já existe uma linha com o nome "${createLinhaDto.nome}".`);
        }

        if (createLinhaDto.horarios) {
            createLinhaDto.horarios = createLinhaDto.horarios.sort();
        }

        const linha = this.linhaRepository.create(createLinhaDto);
        return this.linhaRepository.save(linha);
    }

    async update(id: number, updateLinhaDto: UpdateLinhaDto): Promise<Linha> {
        const linha = await this.findOne(id);


        if (updateLinhaDto.horarios) {
            updateLinhaDto.horarios = updateLinhaDto.horarios.sort();
        }

        Object.assign(linha, updateLinhaDto);
        return this.linhaRepository.save(linha);
    }

    async remove(id: number): Promise<void> {
        const linha = await this.findOne(id);
        await this.linhaRepository.remove(linha);
    }
}