import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MyEncryptionTransformerConfig } from './../helpers/crypto'; 
import dotenv from 'dotenv';

dotenv.config();

@ObjectType()
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
    name: string;

    @Column()
    email: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
    telefone: string;

    @Column({
      transformer: MyEncryptionTransformerConfig
    })
    cpf: string;

}