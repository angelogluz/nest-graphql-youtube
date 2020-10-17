import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { env } from 'process';
import * as NodeRSA from 'node-rsa';

// const key = new NodeRSA({ b: 1024});

let public_key = env.public_key;

 const key_public:NodeRSA = new NodeRSA(public_key);

@ObjectType()
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
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
    phone: string;

    @Column({
        transformer: {
            to: (value: string) => key_public.encrypt(value, 'base64'),
            from: (value: string) => value
        }
    })
    email: string;

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_At' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_At' })
    deletedAt: Date;
}