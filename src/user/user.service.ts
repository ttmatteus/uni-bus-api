import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(dto: CreateUserDto) {
        const exists = await this.repo.findOneBy({ matricula: dto.matricula });
        if (exists) throw new BadRequestException('Matricula já cadastrada');
        return this.repo.save(this.repo.create(dto));
    }

    findAll() {
        return this.repo.find();
    }

    findById(id: number) {
        return this.repo.findOneBy({ id });
    }

    findByMatricula(matricula: string) {
        return this.repo.findOneBy({ matricula });
    }

    async login(matricula: string) {
        const user = await this.findByMatricula(matricula);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado com essa matrícula');
        }

        // Aqui você pode retornar um token, sessão ou apenas o usuário
        return user;
    }
}