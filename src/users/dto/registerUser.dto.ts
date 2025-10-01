import { IsString, IsEmail, MinLength, MaxLength, Matches} from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @MinLength(6, {message: 'Username should be least 6 characterslong'})
    @MaxLength(20, {message: 'Username should be less than 20 characters'})
    @Matches(/^[a-zA-Z0-9]+$/, {message: 'Username should only contain letters and numbers'})
    username: string

    @IsString()
    @MinLength(8, {message: 'Password should be least 8 characterslong'})
    @MaxLength(20, {message: 'Password should be less than 20 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    })
    password: string

    @IsString()
    @IsEmail({}, {message: 'Please provide a valid email format with @'})
    email: string
}

