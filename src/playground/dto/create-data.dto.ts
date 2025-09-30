//dto is DATA TRANSFER OBJECT
import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateDataDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean

    @IsDate()
    @Type(() => Date) //notedev: convert ni to date so class validator can validate it
    createdAt: Date;
}