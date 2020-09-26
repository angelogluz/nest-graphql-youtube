import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateClientInput {
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid Phone' })
  phone: string;
}
