import { Controller, Post, Body, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/updateUser.dto';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { UpdateUserProfileCommand } from './commands/update-user-profile.command';
import { GetUserProfileQuery } from './queries/get-user-profile.query';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Get()
    testAPI() {
        return { message: 'test API'}
    }

    @Post('login')
    login(@Body(ValidationPipe) loginUserInput: LoginUserDto) {
        return this.authService.loginUser(loginUserInput)
    }

    @Post('register')
    create(@Body(ValidationPipe) registerUserInput: RegisterUserDto) {
        return this.commandBus.execute(new RegisterUserCommand(
            registerUserInput.username, 
            registerUserInput.email, 
            registerUserInput.password
        ))

        // return this.usersService.createNewUser(registerUserInput)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    updateUserProfile(@Param('id') id: number, @Body(ValidationPipe) updateUserProfileInput: UpdateUserProfileDto) {
        return this.commandBus.execute(new UpdateUserProfileCommand(
            id, 
            updateUserProfileInput.first_name, 
            updateUserProfileInput.last_name, 
            updateUserProfileInput.age
        ))

        // return this.usersService.updateUserProfileById(id, updateUserProfileInput)
    }

    @Get('profile/:id')
    getUserProfile(@Param('id') id: number) {
        return this.queryBus.execute(new GetUserProfileQuery(id))

        // return this.usersService.getUserProfileById(id)
    }
}
