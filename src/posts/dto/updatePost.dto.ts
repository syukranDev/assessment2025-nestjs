import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsArray} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdatePostDto {
    @IsString({message: 'Title must be a string'})
    @MinLength(3, {message: 'Title must be at least 5 char'})
    @MaxLength(100, {message: 'Title must be less than 100 char'})
    @Field()
    title: string

    @IsString()
    @Field()
    description: string

    @IsArray()
    @IsOptional()
    @Field(() => [String], {nullable: true})
    tags?: string[]
}

