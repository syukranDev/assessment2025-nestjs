import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PlaygroundService } from './playground.service';
import { IsPositivePipe } from './pipes/is-positive.pipe';
import { ValidationPipe } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
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
    create(@Body(ValidationPipe) input: CreateDataDto) {
        // console.log(body) 
        // return 'submit payload data'
        return this.playgroundService.createNewData(input)

    }

    @Get(':id')
    findOne(@Param('id', IsPositivePipe) id: string) {
        return this.playgroundService.findDetails(id)
    }
}
