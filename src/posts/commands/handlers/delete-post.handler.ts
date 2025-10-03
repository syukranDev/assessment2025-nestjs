import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePostCommand } from "../delete-post.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/posts.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
    constructor(
        @InjectRepository(Post)
        private readonly postTable: Repository<Post>,
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
    ) {}

    async execute(command: DeletePostCommand): Promise<{status: string, message: string}> {
        const { username, id } = command;

        const user = await this.userTable.findOne({ where: { username }});
        if (!user) throw new NotFoundException('User not found');
        
        const post = await this.postTable.findOne({ where: { id, created_by: username }});
        if (post?.created_by !== username) throw new ForbiddenException('Deletee is not allowed, you are not the owner of this post')
        if (!post) throw new NotFoundException('Post not found');

        await this.postTable.delete(id);

        return { status: 'success', message: 'Post deleted successfully' };
    }
}
