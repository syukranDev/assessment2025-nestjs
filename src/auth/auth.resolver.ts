import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => {})
    async login(@Args('input') loginInput: LoginUserDto): Promise<{}> {
        return this.authService.loginUser(loginInput);
    }
}