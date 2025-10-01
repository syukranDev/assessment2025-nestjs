import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/updateUser.dto';

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

    @Patch('update/:id')
    updateUserProfile(@Param('id') id: number, @Body(ValidationPipe) updateUserProfileInput: UpdateUserProfileDto) {
        return this.usersService.updateUserProfileById(id, updateUserProfileInput)
    }
}
