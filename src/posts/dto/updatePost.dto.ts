import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsArray} from 'class-validator';

export class UpdatePostDto {
    @IsString({message: 'Title must be a string'})
    @MinLength(3, {message: 'Title must be at least 5 char'})
    @MaxLength(100, {message: 'Title must be less than 100 char'})
    title: string

    @IsString()
    description: string

    @IsArray()
    @IsOptional()
    tags: string[]
}

