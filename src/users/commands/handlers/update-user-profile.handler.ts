import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/users/entities/userProfile.entity';
import { UpdateUserProfileCommand } from '../update-user-profile.command';

@Injectable()
@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
        @InjectRepository(UserProfile)
        private readonly profileTable: Repository<UserProfile>
    ) {}

    async execute(command: UpdateUserProfileCommand): Promise<{ message: string }> {
        const { id, first_name, last_name, age } = command;

        const isUserExists = await this.userTable.findOne({ where: { id } });
        if (!isUserExists) throw new NotFoundException('User not found');
        
        const user = await this.userTable.findOneOrFail({
            where: { id },
            relations: ['profile']
        });

        if (user.profile) {
            await this.profileTable.update(user.profile.id, {
                first_name,
                last_name,
                age
            });
        } else {
            const profile = this.profileTable.create({
                user: user,
                first_name,
                last_name,
                age
            });
            await this.profileTable.save(profile);
        }

        return { message: 'user profile updated successfully' };
    }
}