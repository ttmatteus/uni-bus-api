import { IsNotEmpty, IsNumberString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    matricula: string;
}
