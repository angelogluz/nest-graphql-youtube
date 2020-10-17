import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MyEncryptionTransformerConfig } from './../helpers/crypto'; 
import dotenv from 'dotenv';

dotenv.config();


@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
    name: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
    email: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
      password: string;
    }


