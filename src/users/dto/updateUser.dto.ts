import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
    @IsString({message: 'First name must be a string'})
    @IsOptional()
    first_name?: string

    @IsString({message: 'Last name must be a string'})
    @IsOptional()
    last_name?: string

    @IsNumber({}, {message: 'Age must be a number'})
    @IsOptional()
    age?: number
}

