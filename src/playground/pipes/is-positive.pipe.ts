import { 
    PipeTransform, 
    Injectable, 
    BadRequestException 
} from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
    transform(value: number) {
        if (value <= 0) {
            throw new BadRequestException('Value must be positive');
        }

        if (isNaN(value)) {
            throw new BadRequestException('Value must be a number');
        }

        return value;
    }
}