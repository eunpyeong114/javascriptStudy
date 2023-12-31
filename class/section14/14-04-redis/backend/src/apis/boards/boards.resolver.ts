import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    // typeORM의 injectrepository와 동일 기능
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // 1. 캐시에서 조회하는 연습
    const mycache = await this.cacheManager.get('qqq');
    console.log(mycache);
    // 2. 조회완료 메세지 전달
    return '캐시에서 조회 완료!!';

    // redis 연습을 위해서 잠시 주석걸기!!
    // return this.boardsService.findAll();
  }
  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    // set저장('키','값',{ttl등 옵션})
    await this.cacheManager.set('qqq', createBoardInput, {
      ttl: 10,
    });
    // 2. 등록완료 메세지 전달
    return '캐시에 등록 완료!!';

    // redis 연습을 위해서 잠시 주석걸기!!
    // return this.boardsService.create({ createBoardInput });
  }
}
