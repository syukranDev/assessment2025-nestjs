import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagCommand } from '../create-tag.command';
import { Tag } from 'src/tags/entities/tags.entity';

@Injectable()
@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    async execute(command: CreateTagCommand): Promise<Tag> {
        const { name } = command;

        const existingTag = await this.tagRepository.findOne({ where: { name } });
        if (existingTag) throw new ConflictException('Tag already exists, please create another tag namee');
        
        const tag = this.tagRepository.create({ name });

        return this.tagRepository.save(tag);
    }
}