import { Controller, Post, Get, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/createTag.dto';
import { ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTagCommand } from './commands/create-tag.command';
import { GetAllTagsQuery } from './queries/get-all-tags.query';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post('create')
    createTag(@Body(ValidationPipe) createTagDto: CreateTagDto) {
        return this.commandBus.execute(new CreateTagCommand(createTagDto.name))
        // return this.tagsService.createNewTag(createTagDto)
    }

    @Get('all')
    getAllTags() {
        return this.queryBus.execute(new GetAllTagsQuery())
        // return this.tagsService.getAllTags()
    }
}
