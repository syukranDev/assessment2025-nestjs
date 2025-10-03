import { IsString, IsEmail, MinLength, MaxLength, Matches, IsTaxId} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
    @IsString()
    @Field()
    username: string

    @IsString()
    @Field()
    password: string
}

