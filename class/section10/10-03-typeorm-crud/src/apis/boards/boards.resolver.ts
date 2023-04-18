import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//import { AppService } from './board.service';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    //fetchBoards 가 endpoint다
    return this.boardsService.findAll();
  }
  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string, // 필수입력값이 아니게 만들기(기본값 = 필수입력)
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
