import { RouterModule } from "@nestjs/core";
import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../interface/user.interface";


export class profileDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    role: Role;
}