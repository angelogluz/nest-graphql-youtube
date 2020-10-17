import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
    @IsString()
    @IsNotEmpty({message: 'Invalid characters'})
    name: string;

    @IsString()
    @IsNotEmpty({message: 'Invalid characters'})
    phone: string;

    @IsEmail()
    @IsNotEmpty({message: 'Invalid E-mail'})
    email: string;
}