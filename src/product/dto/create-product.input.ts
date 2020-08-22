import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {
    @IsString()
    @IsNotEmpty({message: 'This field can not be empty.'})
    name: string;

    @IsNumber()
    @IsNotEmpty({message: 'Only numbers allowed in this field.'})
    value: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Only numbers allowed in this field.'})
    quantity: number;

}