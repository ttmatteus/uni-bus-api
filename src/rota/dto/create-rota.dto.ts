import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsString, ValidateNested } from "class-validator";



class PontoDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;
}

export class CreateRotaDto {
    @IsString()
    nome: string;

    @IsInt()
    linha_id: number;

    @IsArray()
    @ArrayMinSize(2)
    @ValidateNested({ each: true })
    @Type(() => PontoDto)
    pontos: PontoDto[];
}