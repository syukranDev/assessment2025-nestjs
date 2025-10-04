import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdateUserProfileDto } from './dto/updateUser.dto';
import { GetUserProfileQuery } from './queries/get-user-profile.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';   
import { RegisterUserCommand } from './commands/register-user.command';
import { UpdateUserProfileCommand } from './commands/update-user-profile.command';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/guards/graphql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, // notedev: this old way via sercvice
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
) {}

  @UseGuards(GraphqlJwtAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.queryBus.execute(new GetUserProfileQuery(id))
    // return this.usersService.getUserProfileById(id); // notedev: this old way via sercvice
  }

  @Mutation(() => User)
  async createUser(@Args('input') createUserInput: RegisterUserDto) {
    return this.commandBus.execute(new RegisterUserCommand(
        createUserInput.username, 
        createUserInput.password, 
        createUserInput.email
    ))

    // return this.usersService.createNewUser(createUserInput); // notedev: this old way via sercvice
  }

  @UseGuards(GraphqlJwtAuthGuard)
  @Mutation(() => String)
  async updateUserProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateUserInput: UpdateUserProfileDto
  ) {
    const result = await this.commandBus.execute(new UpdateUserProfileCommand(
        id, 
        updateUserInput.first_name, 
        updateUserInput.last_name, 
        updateUserInput.age
    ));
    
    return result.message;

    //return (await this.usersService.updateUserProfileById(id, updateUserInput))?.message; // notedev: this old way via sercvice
  }
}