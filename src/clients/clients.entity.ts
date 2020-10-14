import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { MyEncryptionTransformerConfig } from './../encryption-config'

@ObjectType()
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
    })
    email: string;

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
    })
    telefone: string;

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer(MyEncryptionTransformerConfig)
    })
    cpf: string;
} 