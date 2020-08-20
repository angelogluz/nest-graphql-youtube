import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoService],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
