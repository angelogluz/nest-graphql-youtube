import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import TestUtilClient from './../common/test/TestUtilClients';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;

  const mockRepository = {
    findAllClients: jest.fn(),
    findClientById: jest.fn(),
    createClient: jest.fn(),
    updateClient: jest.fn(),
    deleteClient: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  beforeEach(() => {
    mockRepository.findAllClients.mockReset();
    mockRepository.createClient.mockReset();
    mockRepository.deleteClient.mockReset();
    mockRepository.findClientById.mockReset();
    mockRepository.updateClient.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search All Clients', () => {
    it('should be list all clients', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.findAllClients.mockReturnValue([client, client]);
      const clients = await service.findAllClients();
      expect(clients).toHaveLength(2);
      expect(mockRepository.findAllClients).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Client By Id', () => {
    it('should find a existing client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.findClientById.mockReturnValue(client);
      const clientFound = await service.findClientById('1');
      expect(clientFound).toMatchObject({ name: client.name });
      expect(mockRepository.findClientById).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a client', async () => {
      mockRepository.findClientById.mockReturnValue(null);
      expect(service.findClientById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findClientById).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create client', () => {
    it('should create a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.createClient.mockReturnValue(client);
      mockRepository.createClient.mockReturnValue(client);
      const savedClient = await service.createClient(client);

      expect(savedClient).toMatchObject(client);
      expect(mockRepository.createClient).toBeCalledTimes(1);
      // expect(mockRepository.).toBeCalledTimes(1);
    });

    it('should return a exception when doesnt create a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.createClient.mockReturnValue(null);
      mockRepository.createClient.mockReturnValue(client);

      await service.createClient(client).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problem to create a client. Try again',
        });
      });
      expect(mockRepository.createClient).toBeCalledTimes(1);
      // expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('When update Client', () => {
    it('Should update a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      const updatedClient = { name: 'Novo Nome' };
      mockRepository.findClientById.mockReturnValue(client);
      mockRepository.updateClient.mockReturnValue({
        ...client,
        ...updatedClient,
      });
      mockRepository.createClient.mockReturnValue({
        ...client,
        ...updatedClient,
      });

      const resultClient = await service.updateClient('1', {
        ...client,
        name: 'Novo Nome',
      });

      expect(resultClient).toMatchObject(updatedClient);
      expect(mockRepository.createClient).toBeCalledTimes(1);
      expect(mockRepository.findClientById).toBeCalledTimes(1);
      expect(mockRepository.updateClient).toBeCalledTimes(1);
    });
  });

  describe('When delete Client', () => {
    it('Should delete a existing client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.deleteClient.mockReturnValue(client);
      mockRepository.findClientById.mockReturnValue(client);

      const deletedClient = await service.deleteClient('1');

      expect(deletedClient).toBe(true);
      expect(mockRepository.findClientById).toBeCalledTimes(1);
      expect(mockRepository.deleteClient).toBeCalledTimes(1);
    });

    it('Should not delete a inexisting client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.deleteClient.mockReturnValue(null);
      mockRepository.findClientById.mockReturnValue(client);

      const deletedClient = await service.deleteClient('9');

      expect(deletedClient).toBe(false);
      expect(mockRepository.findClientById).toBeCalledTimes(1);
      expect(mockRepository.deleteClient).toBeCalledTimes(1);
    });
  });
});
