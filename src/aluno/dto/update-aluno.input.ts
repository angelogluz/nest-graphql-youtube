import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';



@InputType()
export class UpdateAlunoInput {
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    nome?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Invalid characters' })
    sobrenome?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Matricula Invalida' })
    matricula?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Curso - Invalido' })
    curso?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Data de Nascimento Invalida' })
    dataNascimento?: string;

}
