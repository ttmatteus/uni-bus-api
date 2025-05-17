import { IsIn, IsOptional, IsString } from "class-validator";


export class CreateLinhaDto {
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsString()
    campus: string

    @IsIn(['manhã', 'tarde', 'noite'])
    turno: string;

    @IsIn(['circular', 'direto', 'expresso'])
    tipo: string
}