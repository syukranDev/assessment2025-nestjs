//dto is DATA TRANSFER OBJECT
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateDataDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean
}