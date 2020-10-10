import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import * as NodeRSA from 'node-rsa';

const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0q  WvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}

  async findAllClients(): Promise<Client[]> {
    const clients = await this.clientRepository.find();
    for (let i=0; i < clients.length ; i++) {
      clients[i].name = key.decrypt(clients[i].name, 'utf8');
      clients[i].phone = key.decrypt(clients[i].phone, 'utf8');
      clients[i].email = key.decrypt(clients[i].email, 'utf8');
    }
    return clients;
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found')
    }
    
    client.name = key.decrypt(client.name, 'utf8');
    client.phone = key.decrypt(client.phone, 'utf8');
    client.email = key.decrypt(client.email, 'utf8');
    return client;
  }

  async createClient(data:CreateClientInput): Promise<Client>{
    const nameCrypted = key.encrypt(data.name, 'base64');
    const phoneCrypted = key.encrypt(data.phone, 'base64');
    const mailCrypted = key.encrypt(data.email, 'base64');

    data.name = nameCrypted;
    data.phone = phoneCrypted;
    data.email = mailCrypted;

    const client = this.clientRepository.create(data);
    const clientSaved = this.clientRepository.save(client)
    if (!clientSaved) {
      throw new InternalServerErrorException('Something happened. Try again')
    }
    return clientSaved;
  }

  async updateClient(id: string, data: UpdateClientInput):Promise<Client> {
    if(data.name){
      const nameCrypted = key.encrypt(data.name, 'base64');
      data.name = nameCrypted;
    }
    if(data.phone){
      const phoneCrypted = key.encrypt(data.phone, 'base64');
      data.phone = phoneCrypted;
    }
    if(data.email){
      const mailCrypted = key.encrypt(data.email, 'base64');
      data.email = mailCrypted;
    }

    const client = await this.findClientById(id);
    await this.clientRepository.update(client, {...data});
    const clientUpdated = this.clientRepository.create({...client,...data})

    return clientUpdated;
  }

  async deleteClient(id: string): Promise<boolean> {
    const client = await this.findClientById(id);
    const deleted = await this.clientRepository.delete(client);
    if (deleted) {
      return true
    } 
    return false;
  }
}
