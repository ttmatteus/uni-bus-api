import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorito } from "./favorito.entity";
import { User } from "src/user/user.entity";
import { Onibus } from "src/onibus/onibus.entity";
import { FavoritoService } from "./favorito.service";
import { FavoritoController } from "./favorito.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Favorito, User, Onibus])],
    providers: [FavoritoService],
    controllers: [FavoritoController],
    exports: [FavoritoService],
})
export class FavoritoModule {}