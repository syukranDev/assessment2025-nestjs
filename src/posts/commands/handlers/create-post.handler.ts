import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "../create-post.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/posts.entity";
import { Tag } from "src/tags/entities/tags.entity";
import { User } from "src/users/entities/user.entity";
import { In, Repository } from "typeorm";

@Injectable()
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
      @InjectRepository(Tag)
      private readonly tagRepository: Repository<Tag>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async execute(command: CreatePostCommand): Promise<{status: string, message: string}> {
        const { username, title, description, tags } = command;
    
        const user = await this.userRepository.findOne({ where: { username }});
        if (!user) throw new NotFoundException('User not found');
        
        // notedev: 
        // dont allow add new tag if not exists in db
        // tag need to be added manually in add tag API
        let tagsArray: Tag[] = [];
        if (tags) {
          tagsArray = await this.tagRepository.find({ where: { name: In(tags) } });
          if (tagsArray.length !== tags.length) {
            throw new NotFoundException('Tags not exists, please create tag first');
          }
        }
    
        const post = this.postRepository.create({
          title,
          description,
          tags: tagsArray,
          user,
          created_by: username,
        });
    
        await this.postRepository.save(post);
    
        return { status: 'success', message: 'Post created successfully' };
      }
}