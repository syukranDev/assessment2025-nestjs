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

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
) {}

@Query(() => [Post], { name: 'posts' })
  async getPosts(@Args('username') username: string) {
    return this.queryBus.execute(new GetUserPostsQuery(username))
    // return this.postsService.getAllPostsByUser(username);
  }

  @Mutation(() => String)
  async createPost(
    @Args('username') username: string,
    @Args('input') createPostInput: CreatePostDto
  ) {
    return this.commandBus.execute(new CreatePostCommand(
      username,
      createPostInput.title,
      createPostInput.description,
      createPostInput.tags
    ))
    // const result = await this.postsService.createNewPost(username, createPostInput);
    // return result.message;
  }

  @Mutation(() => String)
  async updatePost(
    @Args('username') username: string,
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updatePostInput: UpdatePostDto
  ) {
    return this.commandBus.execute(new UpdatePostCommand(
      username,
      id,
      updatePostInput.title,
      updatePostInput.description,
      updatePostInput.tags
    ))

    // const result = await this.postsService.updatePostByUser(username, id, updatePostInput);
    // return result.message;
  }

  @Mutation(() => String)
  async deletePost(
    @Args('username') username: string,
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.commandBus.execute(new DeletePostCommand(
      username,
      id
    ))
    // const result = await this.postsService.deletePostByUser(username, id);
    // return result.message;
  }
}