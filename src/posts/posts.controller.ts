import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly commandBus: CommandBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost(@Request() req: any, @Body(ValidationPipe) createPostDto: CreatePostDto) {
        // let username = 'superadmin'
        let username = req.user.username;

        // return this.postsService.createNewPost(username, createPostDto) --- notedev: old way using service 
        return this.commandBus.execute(new CreatePostCommand( // notedev: new using CQRS pattern
            username, 
            createPostDto.title,
            createPostDto.description,
            createPostDto.tags
        ))
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllPosts(@Request() req: any) {
        // let username = 'superadmin'
        let username = req.user.username;
        return this.postsService.getAllPostsByUser(username)
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    updatePost(@Request() req: any, @Body(ValidationPipe) updatePostDto: UpdatePostDto, @Param('id') id: number) {
        // let username = 'superadmin'
        let username = req.user.username;
        return this.postsService.updatePostByUser(username, id, updatePostDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletePost(@Request() req: any, @Param('id') id: number) {
        // let username = 'superadmin'
        let username = req.user.username;
        return this.postsService.deletePostByUser(username, id)
    }
}
