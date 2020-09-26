import { PartialType } from '@nestjs/mapped-types';
import { CreateClientInput } from './create-client.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @Field(() => Int)
  id: number;
}