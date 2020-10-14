import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Clients } from './clients.entity';
import { CreateClientsInput } from './dto/create-clients.input';
import { UpdateClientsInput } from './dto/update-clients.input';

@Resolver('Clients')
export class ClientsResolver {

    constructor(
        private clientsService: ClientsService
    ) { }

    @Query(() => [Clients])
    async Clients(): Promise<Clients[]> {
        const clientes = await this.clientsService.findAllClients();
        return clientes;
    }

    @Query(() => Clients)
    async cliente(
        @Args('id') id: string
    ): Promise<Clients> {
        const cliente = this.clientsService.findClientsById(id);
        return cliente;
    }

    @Mutation(() => Clients)
    async createClients(
        @Args('data') data: CreateClientsInput
    ): Promise<Clients> {
        const cliente = await this.clientsService.createClients(data);
        return cliente;
    }

    @Mutation(() => Clients)
    async updateClients(
        @Args('id') id: string,
        @Args('data') data: UpdateClientsInput
    ): Promise<Clients> {
        const cliente = this.clientsService.updateClients(id, data);
        return cliente;
    }

    @Mutation(() => Boolean)
    async deleteClients(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.clientsService.deleteClients(id);
        return deleted;
    }
}