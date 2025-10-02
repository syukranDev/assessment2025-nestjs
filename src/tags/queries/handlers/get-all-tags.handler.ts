import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tags.entity';
import { GetAllTagsQuery } from '../get-all-tags.query';

@Injectable()
@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    async execute(query: GetAllTagsQuery): Promise<Tag[]> {
        return this.tagRepository.find();
    }
}