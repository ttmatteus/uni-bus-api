import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorito } from "./favorito.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Onibus } from "src/onibus/onibus.entity";


@Injectable()
export class FavoritoService {
    constructor(
        @InjectRepository(Favorito)
        private repo: Repository<Favorito>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Onibus)
        private onibusRepo: Repository<Onibus>
    ){}

    async favoritar(userId: number, onibusId: number) {
        const usuario = await this.userRepo.findOneBy({ id: userId });
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado');
        }
        const onibus = await this.onibusRepo.findOneBy({ id: onibusId });
        if (!onibus){
            throw new NotFoundException("Ônibus não encontrado");
        }
        const existente = await this.repo.findOne({
        where: {
            usuario: { id: userId },
            onibus: { id: onibusId },
        },
        });

        if (existente) {
        throw new ConflictException('Este ônibus já está nos seus favoritos');
        }

        const favorito = this.repo.create({ usuario, onibus });
        return this.repo.save(favorito);
        
    }

    async desfavoritar(userId: number, onibusId: number) {
    const favorito = await this.repo.findOne({
        where: {
        usuario: { id: userId },
        onibus: { id: onibusId },
        },
    });

    if (!favorito) {
        throw new NotFoundException('Este ônibus não está nos seus favoritos');
    }

    await this.repo.remove(favorito);
    }


    async listarFavoritos(userId: number) {
        return this.repo.find({ where: { usuario: { id: userId } }, relations: ['onibus'] });
    }
}