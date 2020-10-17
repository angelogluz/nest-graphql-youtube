import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('ClientsService', () => {
    let service: ClientsService;
  
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            ClientsService,
            {
              provide: getRepositoryToken(Clients),
              useValue: mockRepository,
            },
          ],
        }).compile();
    
        service = module.get<ClientsService>(ClientsService);
      });
    
      beforeEach(() => {
        mockRepository.find.mockReset();
        mockRepository.findOne.mockReset();
        mockRepository.create.mockReset();
        mockRepository.save.mockReset();
        mockRepository.update.mockReset();
        mockRepository.delete.mockReset();
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      describe('Quando encontrar todos os clientes', () => {
        it('Listar todos os clientes', async () => {
            const client = TestUtil.giveAMeAValidClient();
            mockRepository.find.mockReturnValue([client, client]);
            const clients = await service.findAllClients();
            expect(clients).toHaveLength(2);
            expect(mockRepository.find).toHaveBeenCalledTimes(1);
        })
      });

      describe('Quando procurar cliente pelo ID', () => {
        it('Deve encontrar um cliente válido', async () => {
          const client = TestUtil.giveAMeAValidClient();
          mockRepository.findOne.mockReturnValue(client);
          const clientFound = await service.findClientsById('1');
          expect(clientFound).toMatchObject({ name: client.name });
          expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
        it('Qaundo não encontrar cliente', async () => {
          mockRepository.findOne.mockReturnValue(null);
          expect(service.findClientsById('2')).rejects.toBeInstanceOf(
            NotFoundException,
          );
          expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        });
      });

      describe('Quando cliente é criado', () => {
        it('Deve criar um cliente', async () => {
          const client = TestUtil.giveAMeAValidClient();
          mockRepository.save.mockReturnValue(client);
          mockRepository.create.mockReturnValue(client);
          const savedClient = await service.createClient(client);
    
          expect(savedClient).toMatchObject(client);
          expect(mockRepository.create).toBeCalledTimes(1);
          expect(mockRepository.save).toBeCalledTimes(1);
        });
      it('Deve retornar erro quando não criar o cliente', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.save.mockReturnValue(null);
        mockRepository.create.mockReturnValue(client);
    
        await service.createClient(client).catch(e => {
          expect(e).toBeInstanceOf(InternalServerErrorException);
          expect(e).toMatchObject({
            message: 'Problema na criação de cliente',
          });
        });
        expect(mockRepository.create).toBeCalledTimes(1);
        expect(mockRepository.save).toBeCalledTimes(1);
      });
    });

    describe('Quando atualizar os dados do cliente', () => {
        it('Deve atualizar o cliente', async () => {
          const client = TestUtil.giveAMeAValidClient();
          const updatedClient = { name: 'Nome Atualizado' };
          mockRepository.findOne.mockReturnValue(client);
          mockRepository.update.mockReturnValue({
            ...client,
            ...updatedClient,
          });
          mockRepository.create.mockReturnValue({
            ...client,
            ...updatedClient,
          });
    
          const resultClient = await service.updateClients('1', {
            ...client,
            name: 'Nome Atualizado',
          });
    
          expect(resultClient).toMatchObject(updatedClient);
          expect(mockRepository.create).toBeCalledTimes(1);
          expect(mockRepository.findOne).toBeCalledTimes(1);
          expect(mockRepository.update).toBeCalledTimes(1);
        });
      });

      describe('Quando deletar cliente', () => {
        it('Deve deletar um cliente', async () => {
          const client = TestUtil.giveAMeAValidClient();
          mockRepository.delete.mockReturnValue(client);
          mockRepository.findOne.mockReturnValue(client);
    
          const deletedClient = await service.deleteClient('1');
    
          expect(deletedClient).toBe(true);
          expect(mockRepository.findOne).toBeCalledTimes(1);
          expect(mockRepository.delete).toBeCalledTimes(1);
        });
    
        it('Não deletar usuário inexistente', async () => {
          const client = TestUtil.giveAMeAValidClient();
          mockRepository.delete.mockReturnValue(null);
          mockRepository.findOne.mockReturnValue(client);
    
          const deletedClient = await service.deleteClient('9');
    
          expect(deletedClient).toBe(false);
          expect(mockRepository.findOne).toBeCalledTimes(1);
          expect(mockRepository.delete).toBeCalledTimes(1);
        });
      });
});