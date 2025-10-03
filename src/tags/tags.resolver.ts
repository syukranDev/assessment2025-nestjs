import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TagsService } from './tags.service';
import { Tag } from './entities/tags.entity';
import { CreateTagDto } from './dto/createTag.dto';
import { GetAllTagsQuery } from './queries/get-all-tags.query';
import { CreateTagCommand } from './commands/create-tag.command';

@Resolver(() => Tag)
export class TagsResolver {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    @Query(() => [Tag], { name: 'tags' })
    async getAllTags() {
        return this.queryBus.execute(new GetAllTagsQuery())
    }

    @Mutation(() => Tag)
    async createTag(@Args('input') createTagInput: CreateTagDto) {
        return this.commandBus.execute(new CreateTagCommand(
            createTagInput.name
        ))
    }
}