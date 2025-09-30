import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';

@Controller('playground')
export class PlaygroundController {
    @Get()
    findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
        console.log(sort)
        return 'this is all data';
    }

    @Get('featured')
    findFeatured() {
        return 'this is featured data'
    }

    @Post()
    create(@Body() body: any) {
        console.log(body) 
        return 'submit payload data'

    }

    findOne(@Param('id') id: string) {
        return `this is ${id} data (single data)`
    }




}
