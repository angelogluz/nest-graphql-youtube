import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { env } from 'process';


import * as NodeRSA from 'node-rsa';

let private_key = env.private_key;
const key_private = new NodeRSA(private_key);

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        users.map(el => {
            el.name = key_private.decrypt(el.name, 'utf8');
            el.email = key_private.decrypt(el.email, 'utf8');
        });
        return users;
    }

    @Query(() => User)
    async user(
        @Args('id') id: string
    ): Promise<User> {
        const user = await this.userService.findUserById(id);
        user.name = key_private.decrypt(user.name, 'utf8');
        user.email = key_private.decrypt(user.email, 'utf8');
        return user;
    }


  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.updateUser({ id, ...data });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<true> {
    await this.userService.deleteUser(id);
    return true;
  }
}
