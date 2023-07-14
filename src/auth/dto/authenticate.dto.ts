import { IsNotEmpty, IsString } from "class-validator";


export class AuthenticateDto{
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string; 
}