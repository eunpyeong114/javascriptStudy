import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    id: string;
  };
}

// express기반의 req,res import하기
export interface IContext {
  req: Request & IAuthUser; // req안에 user가 없을 수도 있기 때문에! why? 다른 guard가 필요 없는 API에서도 사용하는 경우가 있기 때문에
  res: Response;
}
