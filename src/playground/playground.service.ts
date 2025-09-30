import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDataDto } from './dto/create-data.dto';
@Injectable()
export class PlaygroundService {
    // function logic used by controller letak sini
    findFeatured() {
        return new HttpException('data not found', 422)  
        // return new NotFoundException('data not found') 
        // return {
        //     message: 'this is featured data'
        // }
    }

    findDetails(id: string) {
        return `this is ${id} data (single data)`
    }

    createNewData(createDataDto: CreateDataDto) {
        return createDataDto
    }
}
