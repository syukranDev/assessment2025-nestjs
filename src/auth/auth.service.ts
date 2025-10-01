import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
    ) {}


    // TODO laterrrr
    // async loginUser(loginUserInput: LoginUserDto): Promise<User> {

    // }
}
