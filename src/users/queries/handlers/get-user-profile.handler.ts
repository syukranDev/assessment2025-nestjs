import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GetUserProfileQuery } from '../get-user-profile.query';

@Injectable()
@QueryHandler(GetUserProfileQuery)
export class GetUserProfileHandler implements IQueryHandler<GetUserProfileQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userTable: Repository<User>
    ) {}

    async execute(query: GetUserProfileQuery): Promise<User> {
        const { id } = query;
        
        const user = await this.userTable.findOneOrFail({
            where: { id },
            relations: ['profile']
        });
        
        if (!user) throw new NotFoundException('User not found');
        
    
        
        return user;
    }
}