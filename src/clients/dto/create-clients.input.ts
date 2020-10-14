import { InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

@InputType()
export class CreateClientsInput {

    @IsString()
    @IsNotEmpty({ message: 'Nome inválido!' })
    name: string;

    @IsEmail()
    @IsNotEmpty({ message: 'E-mail inválido!' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Telefone inválido!' })
    telefone: string;

    @IsString()
    @IsNotEmpty({ message: 'CPF inválido!' })
    cpf: string;

} 