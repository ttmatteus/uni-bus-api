import { IsIn, IsOptional, IsString, Matches } from "class-validator";

export class CreateLinhaDto {
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsString()
    campus: string;

    @IsIn(['manhã', 'tarde', 'noite'])
    turno: string;

    @IsIn(['circular', 'direto', 'expresso'])
    tipo: string;

    @IsString({ each: true }) 
    @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, { each: true, message: 'Cada horário deve estar no formato HH:mm' })
    horarios?: string[];
}