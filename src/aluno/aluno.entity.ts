import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm"
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
@Entity()
export class Aluno {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    sobrenome: string;

    @Column()
    matricula: string;

    @Column()
    curso: string;

    @Column()
    dataNascimento: string;

    @OneToOne(type => User, user => user.aluno)
    @JoinColumn()
    user: User;
}