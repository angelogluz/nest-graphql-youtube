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

import * as NodeRSA from 'node-rsa';

const key = new NodeRSA(process.env.CRYPT_KEY);

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
    for (let i = 0; i < clients.length; i++) {
      clients[i].name = key.decrypt(clients[i].name, 'utf8');
      clients[i].phone = key.decrypt(clients[i].phone, 'utf8');
      clients[i].email = key.decrypt(clients[i].email, 'utf8');
    }
    return clients;
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    client.name = key.decrypt(client.name, 'utf8');
    client.phone = key.decrypt(client.phone, 'utf8');
    client.email = key.decrypt(client.email, 'utf8');
    return client;
  }

  async createClient(data: CreateClientInput): Promise<Client> {
    const nameCrypted = key.encrypt(data.name, 'base64');
    const phoneCrypted = key.encrypt(data.phone, 'base64');
    const mailCrypted = key.encrypt(data.email, 'base64');

    data.name = nameCrypted;
    data.phone = phoneCrypted;
    data.email = mailCrypted;
    const client = this.clientRepository.create(data);
    const clientSaved = this.clientRepository.save(client);
    if (!clientSaved) {
      throw new InternalServerErrorException('Something happened. Try again');
    }
    return clientSaved;
  }

  async updateClient(id: string, data: UpdateClientInput): Promise<Client> {
    if (data.name) {
      const nameCrypted = key.encrypt(data.name, 'base64');
      data.name = nameCrypted;
    }
    if (data.phone) {
      const phoneCrypted = key.encrypt(data.phone, 'base64');
      data.phone = phoneCrypted;
    }
    if (data.email) {
      const mailCrypted = key.encrypt(data.email, 'base64');
      data.email = mailCrypted;
    }

    const client = await this.findClientById(id);
    await this.clientRepository.update(client, { ...data });
    const clientUpdated = this.clientRepository.create({ ...client, ...data });

    return clientUpdated;
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
