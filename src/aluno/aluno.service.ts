import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoInput } from './dto/create-aluno.input';
import { UpdateAlunoInput } from './dto/update-aluno.input';


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

    async findAlunoById(id: string): Promise<Aluno> {
        const aluno = await this.alunoRepository.findOne(id);    
        if(!aluno) {
            throw new NotFoundException('Aluno não encontrado');
        }    
        return aluno;
    }

    async createAluno(data: CreateAlunoInput): Promise<Aluno> {
        const aluno = await this.alunoRepository.create(data);
        const alunoSaved = await this.alunoRepository.save(aluno);

        if (!alunoSaved) {
            throw new InternalServerErrorException('Problema na Criação do Aluno');
        }
        return alunoSaved;
    }

    async updateAluno(id: string, data: UpdateAlunoInput): Promise<Aluno> {
        const aluno = await this.findAlunoById(id);

        await this.alunoRepository.update(aluno, { ...data });

        const alunoUpdated = this.alunoRepository.create({ ...aluno, ...data })
        
        return alunoUpdated;
    }


}
