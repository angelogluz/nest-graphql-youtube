import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoResolver } from './aluno.resolver';

@Module({
  providers: [AlunoService, AlunoResolver]
})
export class AlunoModule {}
