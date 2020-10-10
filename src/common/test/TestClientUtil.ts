
import { Clients } from './../../clients/clients.entity';

export default class TestClientUtil {
  static giveAMeAValidClient(): Clients {
    const client = new Clients();
    client.telefone = '5330110000';
    client.email = 'valid@email.com';
    client.name = 'Angelo Luz';
    client.id = '1';
    return client;
  }
}
