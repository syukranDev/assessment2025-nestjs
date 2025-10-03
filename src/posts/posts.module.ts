import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { PostsService } from './posts.service';
import { Tag } from 'src/tags/entities/tags.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserPostsHandler } from './queries/handlers/get-user-posts.handler';
import { UpdatePostHandler } from './commands/handlers/update-post.handler';
import { DeletePostHandler } from './commands/handlers/delete-post.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, User]),
    CqrsModule
  ],
  controllers: [PostsController],
  providers: [
    PostsService,

    CreatePostHandler,
    GetUserPostsHandler,
    UpdatePostHandler,
    DeletePostHandler,
  ]
})
export class PostsModule {}
