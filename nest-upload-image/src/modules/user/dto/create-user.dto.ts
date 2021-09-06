import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    lastName: string;

    @IsString()
    photo: string;

}
