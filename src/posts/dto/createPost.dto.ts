import { IsString, IsEmail, MinLength, MaxLength, Matches, IsArray, IsNumber, IsOptional} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreatePostDto {
    @IsString({message: 'title must be a string'})
    @MinLength(3, {message: 'title must be at least 5 char'})
    @MaxLength(100, {message: 'title must be less than 100 char'})
    @Field()
    title: string

    @IsString()
    @MinLength(3, {message: 'description must be at least 5 char'})
    @Field()
    description: string

    @IsArray()
    @IsOptional()
    @Field(() => [String], {nullable: true})
    tags?: string[]
}

