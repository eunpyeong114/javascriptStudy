import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceLogin {
  userId: string;
  pwd: string;
}

export interface IAuthServiceGetAccessToken {
  user: User;
}
