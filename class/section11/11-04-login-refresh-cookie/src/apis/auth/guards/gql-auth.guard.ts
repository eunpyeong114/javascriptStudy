import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  // graphql이 껍데기(context)를 감싸고 있어서 graphql에서만 해주는 과정 // rest는 필요 없다
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context); //graphql로 읽을 수 있게 해주는 역할
    return gqlContext.getContext().req; //req를 뽑아 내는 것
  }
}
