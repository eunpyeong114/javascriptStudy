import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}
  @UseGuards(GqlAuthAccessGuard) // AuthGuard 성공해야만 아래 코드 실행
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    // 유저 정보 가져오기 API
    // req와 res 값 가져올 수 있다
    console.log(context.req.user.id); //유저ID 가 들어있다
    return '인가에 성공하였습니다.';
  }
  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    // number타입은 타입 생략시 Float가 기본이기때문에 Int로 선언 해주어야함
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.usersService.create({ email, password, name, age });
  }
}
