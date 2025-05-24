import { IsNotEmpty, IsNumberString, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-zÁ-ÿ]+ [A-Za-zÁ-ÿ]+$/)
    nome: string;

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    @IsString()
    matricula: string
}