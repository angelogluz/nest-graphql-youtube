import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

import { encryptionTransformer } from '../../utils/encryptionTransformer';

@ObjectType()
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ transformer: encryptionTransformer })
  name: string;

  @Column({ transformer: encryptionTransformer })
  email: string;

  @Column({ transformer: encryptionTransformer })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  DeletedAt?: Date;
}
