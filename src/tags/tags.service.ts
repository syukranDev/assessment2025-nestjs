import { ConflictException, Injectable, } from '@nestjs/common';
import { Tag } from './entities/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/createTag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagTable: Repository<Tag>
    ) {}

    async createNewTag(createTagDto: CreateTagDto): Promise<Tag> {
        const existingTag = await this.tagTable.findOne({ where: { name: createTagDto.name } })
        if (existingTag) throw new ConflictException('Tag already exists, please create another tag name')

        const tag = this.tagTable.create(createTagDto)
        return this.tagTable.save(tag)
    }

    async getAllTags(): Promise<Tag[]> {
        return this.tagTable.find()
    }
}
