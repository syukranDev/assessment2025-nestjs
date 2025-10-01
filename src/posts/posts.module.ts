import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController]
})
export class PostsModule {}
