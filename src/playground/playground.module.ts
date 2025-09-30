import { Module } from '@nestjs/common';
import { PlaygroundController } from './playground.controller';
import { PlaygroundService } from './playground.service';

@Module({
  controllers: [PlaygroundController], // notedev: manage route API
  providers: [PlaygroundService] // notedev: manage api logic
})
export class PlaygroundModule {}
