import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/users/entities/userProfile.entity';
import { RegisterUserCommand } from '../register-user.command';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly profileTable: Repository<UserProfile>
    ) {}

    async execute(command: RegisterUserCommand): Promise<User> {
        const { username, password, email } = command;

        console.log({username, password, email});
        const existingUser = await this.userTable.findOne({ where: { username } });
        if (existingUser) throw new ConflictException('username already exists');
        
        
        const existingEmail = await this.userTable.findOne({ where: { email } });
        console.log(existingEmail);
        if (existingEmail) throw new ConflictException('email already existss');
        

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = this.userTable.create({
            username,
            password: hashedPassword,
            email
        });

        const savedUser = await this.userTable.save(user);

        const profile = this.profileTable.create({
            user: savedUser,
            first_name: 'TBA',
            last_name: 'TBA',
            age: 0
        });
        
        await this.profileTable.save(profile);

        return this.userTable.findOneOrFail({
            where: { id: savedUser.id },
            relations: ['profile']
        });
    }
}