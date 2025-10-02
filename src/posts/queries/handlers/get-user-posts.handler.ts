import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/posts.entity';
import { User } from 'src/users/entities/user.entity';
import { GetUserPostsQuery } from '../get-user-posts.query';

@Injectable()
@QueryHandler(GetUserPostsQuery)
export class GetUserPostsHandler implements IQueryHandler<GetUserPostsQuery> {
  constructor(
    @InjectRepository(Post)
    private readonly postTable: Repository<Post>,
    @InjectRepository(User)
    private readonly userTable: Repository<User>,
  ) {}

  async execute(query: GetUserPostsQuery): Promise<Post[]> {
    const { username } = query;

    const user = await this.userTable.findOne({ where: { username }});
    if (!user) throw new NotFoundException('User not found');
    
    return this.postTable.find({ 
      where: { created_by: username }, 
      relations: ['tags']
    });
  }
}