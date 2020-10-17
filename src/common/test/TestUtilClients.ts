import { Client } from './../../clients/entities/client.entity';

export default class TestUtilClient {
  static giveAMeAValidClient(): Client {
    const client = new Client();
    client.email = 'valid@email.com';
    client.name = 'Edécio Iepsen';
    client.phone = '981045267';
    client.id = '1';
    return client;
  }
}
