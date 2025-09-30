import { Controller, Get, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    @Get() 
    findAll() {
        return 'All posts';
    }

    @Post()
    create() {
        return 'Create post';
    }
}
