import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


export class CreateOnibusDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsNumber()
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    lng: number;

    @IsNumber()
    linhaId: number;

    @IsNumber()
    @IsOptional()
    rotaId?: number;
}