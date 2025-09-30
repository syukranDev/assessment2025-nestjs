import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaygroundService {
    // function logic used by controller letak sini
    findFeatured() {
        return {
            message: 'this is featured data'
        }
    }
}
