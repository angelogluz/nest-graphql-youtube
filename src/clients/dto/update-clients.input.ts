import { InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClientsInput {
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Nome inválido!' })
    name?: string;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty({ message: 'E-mail incorreto!' })
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Telefone inválido!' })
    telefone?: string;


    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'CPF inválido!' })
    cpf?: string;

} 