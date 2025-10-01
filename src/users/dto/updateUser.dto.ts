import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
    @IsString()
    @IsOptional()
    first_name?: string

    @IsString()
    @IsOptional()
    last_name?: string

    @IsNumber()
    @IsOptional()
    age?: number
}

