import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { env } from 'process';

import * as NodeRSA from 'node-rsa';

let public_key = env.public_key;

 const key_public:NodeRSA = new NodeRSA(public_key);

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

    @Column({
        transformer: {
            to: (value: string) => key_public.encrypt(value, 'base64'),
            from: (value: string) => value
        }
    })
    name: string;


    @Column({
        transformer: {
            to: (value: string) => key_public.encrypt(value, 'base64'),
            from: (value: string) => value
        }
    })
    email: string;

}
