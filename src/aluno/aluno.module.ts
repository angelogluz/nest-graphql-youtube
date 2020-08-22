import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoResolver } from './aluno.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno])
  ],
  providers: [AlunoService, AlunoResolver]
})
export class AlunoModule { }
