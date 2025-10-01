import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post('create')
    createPost(@Body(ValidationPipe) createPostDto: CreatePostDto) {
        let username = 'superadmin'
        return this.postsService.createNewPost(username, createPostDto)
    }

    @Get('all')
    getAllPosts() {
        let username = 'superadmin'
        return this.postsService.getAllPostsByUser(username)
    }

    @Put('update/:id')
    updatePost(@Body(ValidationPipe) updatePostDto: UpdatePostDto, @Param('id') id: number) {
        let username = 'superadmin'
        return this.postsService.updatePostByUser(username, id, updatePostDto)
    }

    @Delete('delete/:id')
    deletePost(@Param('id') id: number) {
        let username = 'superadmin'
        return this.postsService.deletePostByUser(username, id)
    }
}
