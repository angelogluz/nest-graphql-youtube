import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email: string;
}
