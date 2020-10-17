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
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    softRemove: jest.fn(),
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
    mockRepository.find.mockReset();
    mockRepository.create.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.update.mockReset();
    mockRepository.save.mockReset();
    mockRepository.softRemove.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search All Clients', () => {
    it('should be list all clients', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.find.mockReturnValue([client, client]);
      const clients = await service.findAllClients();
      expect(clients).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search Client By Id', () => {
    it('should find a existing client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.findOne.mockReturnValue(client);
      const clientFound = await service.findClientById('1');
      expect(clientFound).toMatchObject({ name: client.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a client', async () => {
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findClientById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When create client', () => {
    it('should create a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.save.mockReturnValue(client);
      mockRepository.create.mockReturnValue(client);
      const savedClient = await service.createClient(client);

      expect(savedClient).toMatchObject(client);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return a exception when doesnt create a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.create.mockReturnValue(null);
      mockRepository.create.mockReturnValue(client);

      await service.createClient(client).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Something happened. Try again',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('When update Client', () => {
    it('Should update a client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      const updatedClient = { name: 'Novo Nome' };
      mockRepository.findOne.mockReturnValue(client);
      mockRepository.update.mockReturnValue({
        ...client,
        ...updatedClient,
      });
      mockRepository.create.mockReturnValue({
        ...client,
        ...updatedClient,
      });

      const resultClient = await service.updateClient('1', {
        ...client,
        name: 'Novo Nome',
      });

      expect(resultClient).toMatchObject(updatedClient);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
  });

  describe('When delete Client', () => {
    it('Should delete a existing client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.softRemove.mockReturnValue(client);
      mockRepository.findOne.mockReturnValue(client);

      const deletedClient = await service.deleteClient('1');

      expect(deletedClient).toBe(true);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.softRemove).toBeCalledTimes(1);
    });

    it('Should not delete a inexisting client', async () => {
      const client = TestUtilClient.giveAMeAValidClient();
      mockRepository.softRemove.mockReturnValue(null);
      mockRepository.findOne.mockReturnValue(client);

      const deletedClient = await service.deleteClient('9');

      expect(deletedClient).toBe(false);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.softRemove).toBeCalledTimes(1);
    });
  });
});
