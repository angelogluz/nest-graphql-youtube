import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
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
