import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { User } from './../../users/user.entity';
import { Clients } from './../../clients/clients.entity';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Angelo Luz';
    user.id = '1';
    return user;
  }

  static giveAMeAValidClient(): Clients {
    const client = new Clients();
    client.id = '1';
    client.name = 'Lázaro Pereira';
    client.phone = '53-98802937'
    client.email = 'lazaro@gmail.com';
    return client;
  }
}

export const mockAddAccountParams: CreateUserInput = {
  name: 'Test User',
  email: 'user@email.com',
};

export const mockUpdateUserParams: UpdateUserInput = {
  id: '1',
  email: 'email-updated@email.com',
};

export const mockUserModel: User = {
  id: '1',
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: '2',
    name: 'Test User 2',
    email: 'email2@email.com',
  },
  {
    id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
  },
];
