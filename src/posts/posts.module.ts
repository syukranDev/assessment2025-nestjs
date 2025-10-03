import { forwardRef, Module } from '@nestjs/common';
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
import { PostsResolver } from './posts.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, User]),
    CqrsModule,
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,

    CreatePostHandler,
    GetUserPostsHandler,
    UpdatePostHandler,
    DeletePostHandler,

    PostsResolver,
  ]
})
export class PostsModule {}
