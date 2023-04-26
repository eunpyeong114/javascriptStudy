import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  context: IContext;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user']; // ['user']는 IAuthUser타입에서 user: 을 제외하고 가져오겠다는 의미
}
