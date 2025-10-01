import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { PostsService } from './posts.service';
import { Tag } from 'src/tags/entities/tags.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, User])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
