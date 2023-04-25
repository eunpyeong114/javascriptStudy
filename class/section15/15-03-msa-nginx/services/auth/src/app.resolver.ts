// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

import { Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Mutation(() => String)
  login(): string {
    return 'accessToken!!!';
  }

  @Query(() => String)
  aaa(): string {
    return 'aaa';
  }
}
