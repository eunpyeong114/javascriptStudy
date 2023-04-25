import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserObject } from './dto/update-user.object';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Query(() => User)
  fetchUser(
    //
    @Args('userId') userId: string,
  ): Promise<User> {
    return this.usersService.findOne({ userId });
  }
  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('pwd') pwd: string,
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('phone') phone: string,
    @Args('SSN') SSN: string,
  ): Promise<User> {
    return this.usersService.create({
      email,
      pwd,
      name,
      address,
      phone,
      SSN,
    });
  }
  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.softDeleteUser({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.restoreUser({ userId });
  }
}
