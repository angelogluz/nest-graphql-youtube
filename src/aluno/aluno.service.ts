import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoInput } from './dto/create-aluno.input';


@Injectable()
export class AlunoService {
    constructor(
        @InjectRepository(Aluno)
        private alunoRepository: Repository<Aluno>
    ) { }

    async findAllAlunos(): Promise<Aluno[]> {
        const alunos = await this.alunoRepository.find();
        return alunos;
    }

    async createAluno(data: CreateAlunoInput): Promise<Aluno> {
        const aluno = await this.alunoRepository.create(data);
        const alunoSaved = await this.alunoRepository.save(aluno);

        if (!alunoSaved) {
            throw new InternalServerErrorException('Problema na Criação do Aluno');
        }
        return alunoSaved;
    }


}
