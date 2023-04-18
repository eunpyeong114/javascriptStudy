import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
//import { AppService } from './board.service';
import { BoardsService } from './board.service';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => String, { nullable: true })
  fetchBoards(): string {
    //fetchBoards 가 endpoint다
    return this.boardsService.qqq();
  }
}
