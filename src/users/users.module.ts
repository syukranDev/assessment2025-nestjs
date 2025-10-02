import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserHandler } from './commands/handlers/register-user.handler';
import { UpdateUserProfileHandler } from './commands/handlers/update-user-profile.handler';
import { GetUserProfileHandler } from './queries/handlers/get-user-profile.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User, UserProfile]), 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,

    RegisterUserHandler,
    UpdateUserProfileHandler,
    GetUserProfileHandler,
  ],
  exports: [UsersService, TypeOrmModule] // notedev: pakai untuk auth module later
})
export class UsersModule {}
