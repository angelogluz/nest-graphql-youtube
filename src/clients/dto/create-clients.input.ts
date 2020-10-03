import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

@InputType()
export class CreateClientsInput {

    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Invalid E-mail' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    telefone: string;

    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    cpf: string;

}