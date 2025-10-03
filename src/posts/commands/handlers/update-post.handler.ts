import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "../update-post.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/posts.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "src/tags/entities/tags.entity";
import { In } from "typeorm";

@Injectable()
@CommandHandler(UpdatePostCommand)  
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
    constructor(
        @InjectRepository(Post)
        private readonly postTable: Repository<Post>,
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagTable: Repository<Tag>,
    ) {}

    async execute(command: UpdatePostCommand): Promise<{status: string, message: string}> {
        const { username, id, title, description, tags } = command;

        const user = await this.userTable.findOne({ where: { username }});
        if (!user) throw new NotFoundException('User not found');
        
        const post = await this.postTable.findOne({ where: { id, created_by: username }});
        if (post?.created_by !== username) throw new ForbiddenException('Update post is not allowedd, you are not the owner of this post')
        if (!post) throw new NotFoundException('Post not found');

        let tagsArray: Tag[] = []
        if (tags) {
            tagsArray = await this.tagTable.find({ where: { name: In(tags) } });
            if (tagsArray.length !== tags.length) {
                throw new NotFoundException('Tags not exists, please create tag first')
            }

            post.tags = tagsArray
        }

        if (title) post.title = title
        if (description) post.description = description

        await this.postTable.save(post)

        return { status: 'success', message: 'Post updated successfully' }
    }
}


