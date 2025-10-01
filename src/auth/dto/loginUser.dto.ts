import { IsString, IsEmail, MinLength, MaxLength, Matches, IsTaxId} from 'class-validator';

export class LoginUserDto {
    @IsString()
    username: string

    @IsString()
    password: string
}

