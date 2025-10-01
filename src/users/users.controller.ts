import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/updateUser.dto';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
import { AuthService } from 'src/auth/auth.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
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
        return this.usersService.createNewUser(registerUserInput)
    }

    @Patch('update/:id')
    updateUserProfile(@Param('id') id: number, @Body(ValidationPipe) updateUserProfileInput: UpdateUserProfileDto) {
        return this.usersService.updateUserProfileById(id, updateUserProfileInput)
    }

    @Get('profile/:id')
    getUserProfile(@Param('id') id: number) {
        return this.usersService.getUserProfileById(id)
    }
}
