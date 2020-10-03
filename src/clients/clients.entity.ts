import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted' ; 

@ObjectType()
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column({transformer: new EncryptionTransformer({
        key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/dNcFPAWd8MsBTvwx/Q89fruq\n'+
        'Nsf+Fod4R6vFRvJgdGhL4Da+m4yn5JL+x/ZIFC7HaIYrsqRBHm9g68GRLKVuFnnR\n'+
        'Pk27ZjxSCsuaAPdXgFoicCTl4u6r37EIr/aJE0yNz3DQ0lRBn4Ch+Z3IapbrQj0F\n'+
        '5Et3CSiNOCvB0vAS9QIDAQAB\n',
        algorithm: 'aes-128-cbc',
        ivLength: 16,
        iv: 'ff5ac19190424b1d88f9419ef949ae56'
      })})
    cpf: string;

}