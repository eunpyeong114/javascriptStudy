import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateStarbucksInput } from './dto/create-board.input';
import { Starbucks } from './entities/starbucks.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Starbucks], { nullable: true })
  fetchStarbucks(): Starbucks[] {
    return this.boardsService.getBoards();
  }
  @Mutation(() => String)
  createStarbucks(
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ): string {
    return this.boardsService.create({ createStarbucksInput });
  }
}
