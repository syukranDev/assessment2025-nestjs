import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    testAPI() {
        return { message: 'test API'}
    }

    @Post('register')
    create(@Body(ValidationPipe) registerUserInput: RegisterUserDto) {
        return this.usersService.createNewUser(registerUserInput)
    }
}
