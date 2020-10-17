import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { encryptionTransformer } from '../utils/encryptionTransformer';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ transformer: encryptionTransformer })
  name: string;

  @Column({ transformer: encryptionTransformer })
  email: string;
}
