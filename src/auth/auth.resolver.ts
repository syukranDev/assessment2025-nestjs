import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { LoginResponseDto } from './dto/loginResp.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponseDto)
    async login(@Args('input') loginInput: LoginUserDto) : Promise<LoginResponseDto> {
        return this.authService.loginUser(loginInput);
    }
}