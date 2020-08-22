import { InputType } from "@nestjs/graphql";
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductInput {
    @IsOptional()
    @IsString()
    @IsNotEmpty({message: 'Invalid characters'})
    name?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({message: 'Invalid characters'})
    value?: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({message: 'Invalid characters'})
    quantity?: number;

}