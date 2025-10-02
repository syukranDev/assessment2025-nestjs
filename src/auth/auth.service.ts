import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly UsersService: UsersService,
        private readonly jwt: JwtService
    ) {}

    async loginUser(loginUserInput: LoginUserDto): Promise<{}> {

        const user = await this.UsersService.findByUsername(loginUserInput.username)
        if (!user) throw new UnauthorizedException('Invalid username or password')

        const isPasswordValid = await bcrypt.compare(loginUserInput.password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException('Invalid username or password')

        const payload = {
            username: user.username,
            profile: user.profile
        }

        return {
            access_token: this.jwt.sign(payload),
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              profile: user.profile
            },
          };

    }

    
}
