import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientsInput } from './dto/create-clients.input';
import { UpdateClientsInput } from './dto/update-clients.input';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>
    ) {}

    async findAllClients(): Promise<Clients[]> {
        const clientes = await this.clientsRepository.find();
        return clientes;
    }

    async findClientsById(id: string): Promise<Clients> {
        const cliente = await this.clientsRepository.findOne(id);
        if (!cliente) {
            throw new NotFoundException('Cliente Não encontrado');
        }
        return cliente;
    }

    async createClients(data: CreateClientsInput): Promise<Clients> {
        const cliente = await this.clientsRepository.create(data);
        const clienteSaved = await this.clientsRepository.save(cliente);

        if (!clienteSaved) {
            throw new InternalServerErrorException('Problem to create a client. Try again');
        }
        return clienteSaved;
    }

    async updateClients(id: string, data: UpdateClientsInput): Promise<Clients> {
        const cliente = await this.findClientsById(id);

        await this.clientsRepository.update(cliente, { ...data });

        const clientsUpdated = this.clientsRepository.create({ ...cliente, ...data })

        return clientsUpdated;
    }

    async deleteClients(id: string): Promise<boolean> {
        const cliente = await this.findClientsById(id);

        const deleted = await this.clientsRepository.delete(cliente);

        if (deleted) {
            return true;
        }

        return false;
    }

}
