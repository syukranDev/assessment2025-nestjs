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
import { UsersResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User, UserProfile]), 
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,

    RegisterUserHandler,
    UpdateUserProfileHandler,
    GetUserProfileHandler,

    UsersResolver,
  ],
  exports: [UsersService, TypeOrmModule] // notedev: pakai untuk auth module later
})
export class UsersModule {}
