import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {
    {
      useSoftDelete: true;
    }
  }

  async findAllClients(): Promise<Client[]> {
    const clients = await this.clientRepository.find();

    return clients;
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async createClient(data: CreateClientInput): Promise<Client> {
    const client = this.clientRepository.create(data);
    const clientSaved = this.clientRepository.save(client);
    if (!clientSaved) {
      throw new InternalServerErrorException('Something happened. Try again');
    }
    return clientSaved;
  }

  async updateClient(id: string, data: UpdateClientInput): Promise<Client> {
    const client = await this.findClientById(id);
    await this.clientRepository.update(client, { ...data });
    const clientUpdated = this.clientRepository.create({ ...client, ...data });
    const clientSaved = this.clientRepository.save(clientUpdated);

    return clientSaved;
  }

  async deleteClient(id: string): Promise<boolean> {
    const client = await this.findClientById(id);
    const deleted = await this.clientRepository.softRemove(client);
    if (deleted) {
      return true;
    }
    return false;
  }
}
