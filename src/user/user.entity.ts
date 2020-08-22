import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Aluno } from "src/aluno/aluno.entity";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToOne(type => Aluno, aluno => aluno.user)
    aluno: Aluno

}