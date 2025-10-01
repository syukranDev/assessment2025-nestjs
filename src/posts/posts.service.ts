import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './entities/posts.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { Tag } from 'src/tags/entities/tags.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdatePostDto } from './dto/updatePost.dto';

// note dev:
// - all required token, get username from the token jwt payload l;aterrr

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postTable: Repository<Post>,
        @InjectRepository(Tag)
        private readonly tagTable: Repository<Tag>,
        @InjectRepository(User)
        private readonly userTable: Repository<User>,
    ) {}

    async createNewPost(username: string, createPostDto: CreatePostDto ): Promise<{status: string, message: string}> {
        const user = await this.userTable.findOne({ where: { username }})
        if (!user) throw new NotFoundException('User not found')
        
        // notedev: 
        // dont allow add new tag if not exists in db
        // tag need to be added manually in add tag API
        let tagsArray: Tag[] = []
        if (createPostDto.tags) {
            tagsArray = await this.tagTable.find({ where: { name: In(createPostDto.tags) } })
            if (tagsArray.length !== createPostDto.tags.length) {
                throw new NotFoundException('Tags not exists, please create tag first')
            }
        }

        const post = this.postTable.create({
            title: createPostDto.title,
            description: createPostDto.description,
            tags: tagsArray,
            user,
            created_by: username,
        });
 
        await this.postTable.save(post)

        return { status: 'success', message: 'Post created successfully' }
    }

    async getAllPostsByUser(username: string): Promise<Post[]> {
        const user = await this.userTable.findOne({ where: { username }})
        if (!user) throw new NotFoundException('User not found')
        return this.postTable.find({ where: { created_by: username }, relations: ['tags']})
    }

    async updatePostByUser(username: string, postId: number, updatePostDto: UpdatePostDto): Promise<{status: string, message: string}> {
        const user = await this.userTable.findOne({ where: { username }})
        if (!user) throw new NotFoundException('User not found')

        const post = await this.postTable.findOne({ where: { id: postId, created_by: username }, relations: ['tags']})
        if (!post) throw new NotFoundException('Post not found')

        let tagsArray: Tag[] = []
        if (updatePostDto.tags) {
            tagsArray = await this.tagTable.find({ where: { name: In(updatePostDto.tags) } })
            if (tagsArray.length !== updatePostDto.tags.length) {
                throw new NotFoundException('Tags not exists, please create tag first')
            }

            post.tags = tagsArray
        }

        if (updatePostDto.title) post.title = updatePostDto.title
        if (updatePostDto.description) post.description = updatePostDto.description

        await this.postTable.save(post)

        return { status: 'success', message: 'Post updated successfully' }
    }

    async deletePostByUser(username: string, postId: number): Promise<{status: string, message: string}> {
        const user = await this.userTable.findOne({ where: { username }})
        if (!user) throw new NotFoundException('User not found')

        const post = await this.postTable.findOne({ where: { id: postId, created_by: username }})
        if (!post) throw new NotFoundException('Post not found')
        
        await this.postTable.delete(postId)
        
        return { status: 'success', message: 'Post deleted successfully' }
    }

  
}
