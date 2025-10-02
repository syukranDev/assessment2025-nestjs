import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllTagsHandler } from './queries/handlers/get-all-tags.handler';
import { CreateTagHandler } from './commands/handlers/create-tag.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    CqrsModule
  ],
  controllers: [TagsController],
  providers: [
    TagsService,

    GetAllTagsHandler,
    CreateTagHandler,
  ]
})
export class TagsModule {}
