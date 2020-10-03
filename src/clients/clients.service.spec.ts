import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Clients } from './clients.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import TestUtil from './../common/test/TestClientUtil';

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
  
    describe('When search All Clients', () => {
      it('should list all clients', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.find.mockReturnValue([client, client]);
        const clients = await service.findAllClients();
        expect(clients).toHaveLength(2);
        expect(mockRepository.find).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('When serch Client By Id', () => {
      it('should find a existing client', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.findOne.mockReturnValue(client);
        const clientFound = await service.findClientsById('1');
        expect(clientFound).toMatchObject({ name: client.name });
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      });
      it('should return a exception when does not to find a client', async () => {
        mockRepository.findOne.mockReturnValue(null);
        expect(service.findClientsById('3')).rejects.toBeInstanceOf(
          NotFoundException,
        );
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      });
    });

    describe('When create client', () => {
      it('should create a client', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.save.mockReturnValue(client);
        mockRepository.create.mockReturnValue(client);
        const savedClient = await service.createClients(client);
  
        expect(savedClient).toMatchObject(client);
        expect(mockRepository.create).toBeCalledTimes(1);
        expect(mockRepository.save).toBeCalledTimes(1);
      });
    it('should return a exception when doesnt create a client', async () => {
      const client = TestUtil.giveAMeAValidClient();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(client);
  
      await service.createClients(client).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problem to create a client. Try again',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

    describe('When update client', () => {
      it('Should update client', async () => {
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
  
    describe('When delete client', () => {
      it('Should delete a existing client', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.delete.mockReturnValue(client);
        mockRepository.findOne.mockReturnValue(client);
  
        const deletedClient = await service.deleteClients('1');
  
        expect(deletedClient).toBe(true);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
  
      it('Should not delete a inexisting client', async () => {
        const client = TestUtil.giveAMeAValidClient();
        mockRepository.delete.mockReturnValue(null);
        mockRepository.findOne.mockReturnValue(client);
  
        const deletedClient = await service.deleteClients('9');
  
        expect(deletedClient).toBe(false);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
    });
  });
  

