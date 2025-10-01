import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UpdateUserProfileDto } from './dto/updateUser.dto';

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
        if (existingUser) throw new ConflictException('Username already exists')
        
        const existingEmail = await this.userTable.findOne({ where: { email: registerUserInput.email } })
        if (existingEmail) throw new ConflictException('Email already exists')

        const hashedPassword = await bcrypt.hash(registerUserInput.password, 10)

        const user = this.userTable.create({
            username: registerUserInput.username,
            password: hashedPassword,
            email: registerUserInput.email
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

    async getUserProfileById(id: number): Promise<User> {
        return this.userTable.findOneOrFail({
            where: { id },
            relations: ['profile']
        });
    }

    async updateUserProfileById(id: number, updateUserProfileInput: UpdateUserProfileDto): Promise<{ message: string}> {
        const isUserExists = await this.userTable.findOne({ where: { id } })
        if (!isUserExists) throw new NotFoundException('User not found')
        
        const user = await this.userTable.findOneOrFail({
            where: { id },
            relations: ['profile']
        });

        if (user.profile) {
            await this.profileTable.update(user.profile.id, updateUserProfileInput);
        } else {
            const profile = this.profileTable.create({
                user: user,
                ...updateUserProfileInput
            });
            await this.profileTable.save(profile);
        }

        return { message: 'User profile updated successfully' };
    }

    // TODO laterrrr
    // async loginUser(loginUserInput: LoginUserDto): Promise<User> {

    // }
}
