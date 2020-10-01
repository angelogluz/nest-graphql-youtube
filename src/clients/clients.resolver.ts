import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';

import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private clientsService: ClientsService) {}

  @Query(() => [Client], { name: 'clients' })
  async clients() : Promise<Client[]> {
    const clients = await this.clientsService.findAllClients()
    return clients;
  }

  @Query(() => Client, { name: 'client' })
  async client(
    @Args('id') id: string
  ): Promise<Client> {
    const client = this.clientsService.findClientById(id);
    return client;
  }

  @Mutation(() => Client)
  async createClient(
    @Args('data') data: CreateClientInput
  ): Promise<Client> {
    const client = await this.clientsService.createClient(data);
    return client;
  }

  @Mutation(() => Client)
  async updateClient(
    @Args('id') id: string,
    @Args('data') data: UpdateClientInput
  ): Promise<Client>{
    const client = await this.clientsService.updateClient(id, data);
    return client;
  }

  @Mutation(() => Boolean)
  async deleteClient(
      @Args('id') id: string
  ): Promise<boolean> {
      const deleted = await this.clientsService.deleteClient(id);
      return deleted;
  }
}
