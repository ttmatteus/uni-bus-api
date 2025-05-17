import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { LinhaService } from './linha.service';
import { CreateLinhaDto } from './dto/create-linha.dto';
import { UpdateLinhaDto } from './dto/update-linha.dto';

@Controller('linha')
export class LinhaController {
    constructor(private readonly linhaService: LinhaService) {}

    @Get()
    findAll() {
        return this.linhaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.linhaService.findOne(id);
    }

    @Post()
    create(@Body() createLinhaDto: CreateLinhaDto) {
        return this.linhaService.create(createLinhaDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateLinhaDto: UpdateLinhaDto) {
        return this.linhaService.update(id, updateLinhaDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.linhaService.remove(id);
    }
}
