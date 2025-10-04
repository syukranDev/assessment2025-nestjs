import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class UpdateUserProfileDto {
    @IsString({message: 'First name must be a string'})
    @IsOptional()
    @Field({nullable: true})
    first_name?: string

    @IsString({message: 'Last name must be a string'})
    @IsOptional()
    @Field({nullable: true})
    last_name?: string

    @IsNumber({}, {message: 'Age must be a number'})
    @IsOptional()
    @Field(() => Int, {nullable: true})
    age?: number
}

