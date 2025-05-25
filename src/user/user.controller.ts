// user.controller.ts
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user.service";

@Controller('usuarios')
export class UserContrller {
    constructor(private readonly service: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('matricula/:matricula')
    findByMatricula(@Param('matricula') matricula: string) {
        return this.service.findByMatricula(matricula);
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.service.findById(id);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.service.login(loginDto.matricula);
    }
}
