import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';
import { GetUserPostsQuery } from './queries/get-user-posts.query';
import { UpdatePostCommand } from './commands/update-post.command';
import { DeletePostCommand } from './commands/delete-post.command';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createPost(@Request() req: any, @Body(ValidationPipe) createPostDto: CreatePostDto) {
        // let username = 'superadmin'
        let username = req.user.username;

        return this.commandBus.execute(new CreatePostCommand( 
            username, 
            createPostDto.title,
            createPostDto.description,
            createPostDto.tags
        ))

        // #notedev: old way using service
        // return this.postsService.createNewPost(username, createPostDto)  
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllPosts(@Request() req: any) {
        // let username = 'superadmin'
        let username = req.user.username;
        return this.queryBus.execute(new GetUserPostsQuery(username))

        // #notedev: new way using CQRS pattern
        // return this.postsService.getAllPostsByUser(username)
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    updatePost(@Request() req: any, @Body(ValidationPipe) updatePostDto: UpdatePostDto, @Param('id') id: number) {
        // let username = 'superadmin'
        let username = req.user.username;
        
        return this.commandBus.execute(new UpdatePostCommand(
            username, 
            id, 
            updatePostDto.title,
            updatePostDto.description,
            updatePostDto.tags
        ))

        // #notedev: old way using service
        // return this.postsService.updatePostByUser(username, id, updatePostDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deletePost(@Request() req: any, @Param('id') id: number) {
        // let username = 'superadmin'
        let username = req.user.username;

        return this.commandBus.execute(new DeletePostCommand(
            username, 
            id
        ))

        // #notedev: old way using service
        // return this.postsService.deletePostByUser(username, id)
    }
}
