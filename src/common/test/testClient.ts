import { Clients } from './../../clients/clients.entity';

export default class TestClientUtil {
  static giveAMeAValidClient(): Clients {
    const client = new Clients();
    client.telefone = '53999587282';
    client.email = 'email@email.com';
    client.name = 'Angelo Luz';
    client.id = '1';
    return client;
  }
}