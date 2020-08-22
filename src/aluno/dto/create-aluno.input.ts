import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';



@InputType()
export class CreateAlunoInput {
    
    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    nome: string;
    
    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    sobrenome: string;

    @IsString()
    @IsNotEmpty({ message: 'Matricula Invalida' })
    matricula: string;

    @IsString()
    @IsNotEmpty({ message: 'Curso - Invalido' })
    curso: string;

    @IsString()
    @IsNotEmpty({ message: 'Data de Nascimento Invalida' })
    dataNascimento: string;

}

