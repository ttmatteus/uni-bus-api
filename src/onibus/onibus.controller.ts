import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OnibusService } from './onibus.service';
import { CreateOnibusDto } from './dto/create-onibus.dto';
import { UpdateOnibusDto } from './dto/update-onibus.dto';
import { Onibus } from './onibus.entity';

@Controller('onibus')
export class OnibusController {
    constructor(private readonly onibusService: OnibusService) {}

    @Post()
    create(@Body() createOnibusDto: CreateOnibusDto): Promise<Onibus> {
        return this.onibusService.create(createOnibusDto);
    }

    @Patch(":id")
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOnibusDto: UpdateOnibusDto,
    ): Promise<Onibus> {
        return this.onibusService.update(id, updateOnibusDto);
    }

    @Get()
    findAll(): Promise<Onibus[]> {
        return this.onibusService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Onibus> {
        return this.onibusService.findOne(id);
    }
}
