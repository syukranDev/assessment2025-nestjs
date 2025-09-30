import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
@Controller('playground')
export class PlaygroundController {
    constructor(private readonly playgroundService: PlaygroundService) {}

    //GET http://localhost:3000/playground
    @Get()
    findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
        console.log(sort)
        return 'this is all data';
    }

    //http://localhost:3000/playground/featured
    @Get('featured') 
    findFeatured() { //boleh letak any method name kita nak
        return this.playgroundService.findFeatured()
    }


    //POST http://localhost:3000/playground
    @Post() //
    create(@Body() body: any) {
        console.log(body) 
        return 'submit payload data'

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `this is ${id} data (single data)`
    }
}
