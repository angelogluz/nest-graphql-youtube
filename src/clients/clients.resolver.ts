import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import { CreateClientInput } from './dto/create-client.input';
// import { UpdateClientsInput } from './dto/update-client.input';
import * as NodeRSA from 'node-rsa';
import { env } from 'process'



let private_key = env.private_key
const key_private = new NodeRSA(private_key);


@Resolver('Clients')
export class ClientsResolver {
    constructor(
        private clientsService: ClientsService
    ){}

    @Query(() => [Clients])
    async clients(): Promise<Clients[]> {
        const clients = await this.clientsService.findAllClients();
        clients.map(el => {
        el.name = key_private.decrypt(el.name, 'utf8');
        el.phone = key_private.decrypt(el.phone, 'utf8');
        el.email = key_private.decrypt(el.email, 'utf8');
        });
        return clients;
                  

    }

    @Mutation(() => Clients)
    async createClients(
        @Args('data') data: CreateClientInput
    ): Promise<Clients> {
        const clients = await this.clientsService.createClient(data);
        return clients;
    }
}