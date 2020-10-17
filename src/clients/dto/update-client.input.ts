import { PartialType } from '@nestjs/mapped-types';
import { CreateClientInput } from './create-client.input';
import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid Phone' })
  phone?: string;
}
