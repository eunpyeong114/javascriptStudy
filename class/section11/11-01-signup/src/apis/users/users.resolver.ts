import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

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
