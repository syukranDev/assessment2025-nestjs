import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly profileTable: Repository<UserProfile>
    ) {}

    async createNewUser(registerUserInput: RegisterUserDto): Promise<User>{
        const existingUser = await this.userTable.findOne({ where: { username: registerUserInput.username } })

        if (existingUser) {
            throw new ConflictException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(registerUserInput.password, 10)

        const user = this.userTable.create({
            username: registerUserInput.username,
            password: hashedPassword,
        })

        const savedUser = await this.userTable.save(user)

        const profile = this.profileTable.create({
            user: savedUser,
            first_name: 'TBA',
            last_name: 'TBA',
            age: 0
        })
        
        await this.profileTable.save(profile)

        return this.userTable.findOneOrFail({
            where: { id: savedUser.id },
            relations: ['profile']
        });

    }
}
