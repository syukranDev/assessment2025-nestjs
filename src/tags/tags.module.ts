import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllTagsHandler } from './queries/handlers/get-all-tags.handler';
import { CreateTagHandler } from './commands/handlers/create-tag.handler';
import { TagsResolver } from './tags.resolver';
import { GraphqlJwtAuthGuard } from 'src/guards/graphql-auth.guard';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
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
  controllers: [TagsController],
  providers: [
    TagsService,

    GetAllTagsHandler,
    CreateTagHandler,

    TagsResolver,
  ]
})
export class TagsModule {}
