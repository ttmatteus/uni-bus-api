import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RotaService } from './rota.service';
import { CreateRotaDto } from './dto/create-rota.dto';
import { UpdateLinhaDto } from 'src/linha/dto/update-linha.dto';

@Controller('rota')
export class RotaController {
    constructor(private readonly rotaService: RotaService){}

    @Post()
    create(@Body() dto: CreateRotaDto) {
        return this.rotaService.create(dto);
    }

    @Get()
    findAll() {
        return this.rotaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rotaService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateLinhaDto) {
        return this.rotaService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rotaService.remove(+id);
    }
}
