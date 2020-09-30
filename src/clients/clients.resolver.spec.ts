import { Test, TestingModule } from '@nestjs/testing';
import { ClientsResolver } from './clients.resolver';

describe('ClientsResolver', () => {
  let resolver: ClientsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsResolver],
    }).compile();

    resolver = module.get<ClientsResolver>(ClientsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
