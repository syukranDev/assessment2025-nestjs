import { IsString, IsEmail, MinLength, MaxLength, Matches, IsArray, IsNumber, IsOptional} from 'class-validator';

export class CreateTagDto {
    @IsString({message: 'name must be a string'})
    @MinLength(3, {message: 'name must be at least 5 char'})
    @MaxLength(12, {message: 'name must be less than 12 char'})
    name: string
}

