import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { AlunoService } from './aluno.service';
import { CreateAlunoInput } from './dto/create-aluno.input';
import { Aluno } from './aluno.entity';

@Resolver('Aluno')
export class AlunoResolver {
    constructor(
        private alunoService: AlunoService
    ) { }

    @Query(() => [Aluno])
    async Alunos(): Promise<Aluno[]> {
        const alunos = await this.alunoService.findAllAlunos();
        return alunos;
    }

    @Mutation(() => Aluno)
    async createAluno(
        @Args('data') data: CreateAlunoInput
    ): Promise<Aluno> {
        const aluno = await this.alunoService.createAluno(data);
        return aluno;
    }
}
