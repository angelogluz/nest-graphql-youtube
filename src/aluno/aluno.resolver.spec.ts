import { Test, TestingModule } from '@nestjs/testing';
import { AlunoResolver } from './aluno.resolver';

describe('AlunoResolver', () => {
  let resolver: AlunoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoResolver],
    }).compile();

    resolver = module.get<AlunoResolver>(AlunoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
