import { Controller, Post, Get, Body } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/createTag.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post('create')
    createTag(@Body(ValidationPipe) createTagDto: CreateTagDto) {
        return this.tagsService.createNewTag(createTagDto)
    }

    @Get('all')
    getAllTags() {
        return this.tagsService.getAllTags()
    }
}
