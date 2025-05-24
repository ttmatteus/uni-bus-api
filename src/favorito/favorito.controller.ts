import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FavoritoService } from "./favorito.service";


@Controller('favoritos')
export class FavoritoController {
    constructor(private readonly service: FavoritoService) {}

    @Post(':userId/:onibusId')
    favoritar(@Param('userId') userId: number, @Param('onibusId') onibusId: number) {
        return this.service.favoritar(userId, onibusId);
    }

    @Delete(':userId/:onibusId')
    desfavoritar(@Param('userId') userId: number, @Param('onibusId') onibusId: number) {
        return this.service.desfavoritar(userId, onibusId);
    }

    @Get(':userId')
    listar(@Param('userId') userId: number) {
        return this.service.listarFavoritos(userId);
    }
}
