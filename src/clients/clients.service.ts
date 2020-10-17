import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { Repository } from 'typeorm';
import { UpdateClientInput } from './dto/update-client.input';
import { CreateClientInput } from './dto/create-client.input';



@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients)
        private clientRepository: Repository<Clients>
    ) {}

    async findAllClients(): Promise<Clients[]> {
        const clients = await this.clientRepository.find();        
        return clients;
    }

    async findClientsById(id: string): Promise<Clients> {
        const client = await this.clientRepository.findOne(id);    
        if(!client) {
            throw new NotFoundException('Client not found');
        }    
        return client;
    }

    async createClient(data: CreateClientInput): Promise<Clients> {
        const client = this.clientRepository.create(data);
        const ClientSaved = await this.clientRepository.save(client);
    
        if(!ClientSaved) {
            throw new InternalServerErrorException('Problema na criação de cliente');
        }

        return ClientSaved;
    }

    async updateClients(id: string, data: UpdateClientInput): Promise<Clients> {
        const client = await this.findClientsById(id);

        await this.clientRepository.update(client, { ...data });

        const clientUpdated = this.clientRepository.create({ ...client, ...data })
    
        return clientUpdated;
    }

    async deleteClient(id: string): Promise<boolean> {
        const client = await this.findClientsById(id);

        const deleted = await this.clientRepository.delete(client);
    
        if(deleted) {
            return true;
        }

        return false;
        }
}