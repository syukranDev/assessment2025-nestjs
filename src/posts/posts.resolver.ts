import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/posts.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserPostsQuery } from './queries/get-user-posts.query';
import { CreatePostCommand } from './commands/create-post.command';
import { UpdatePostCommand } from './commands/update-post.command';
import { DeletePostCommand } from './commands/delete-post.command';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/guards/graphql-auth.guard';
import { CurrentUser } from 'src/auth/logged-in-user.decorator';

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
) {}

  @Query(() => [Post], { name: 'posts' })
    async getPosts(@CurrentUser() user: any) {
        return this.queryBus.execute(new GetUserPostsQuery(user.username))
        // return this.postsService.getAllPostsByUser(username);
  }

  @Mutation(() => String)
  async createPost(
    @CurrentUser() user: any,
    @Args('input') createPostInput: CreatePostDto
  ) {
    const result = await this.commandBus.execute(new CreatePostCommand(
      user.username,
      createPostInput.title,
      createPostInput.description,
      createPostInput.tags
    ));
    
    return result.message;
    // const result = await this.postsService.createNewPost(username, createPostInput);
    // return result.message;
  }

  @Mutation(() => String)
  async updatePost(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updatePostInput: UpdatePostDto
  ) {
    const result = await this.commandBus.execute(new UpdatePostCommand(
      user.username,
      id,
      updatePostInput.title,
      updatePostInput.description,
      updatePostInput.tags
    ));
    
    return result.message;

    // const result = await this.postsService.updatePostByUser(username, id, updatePostInput);
    // return result.message;
  }

  @Mutation(() => String)
  async deletePost(
    @CurrentUser() user: any,
    @Args('id', { type: () => Int }) id: number
  ) {
    const result = await this.commandBus.execute(new DeletePostCommand(
      user.username,
      id
    ));
    
    return result.message;
    // const result = await this.postsService.deletePostByUser(username, id);
    // return result.message;
  }
}