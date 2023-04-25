import { UpdateUserInput } from '../dto/update-user.input';

export interface IUserServiceFindOne {
  userId: string;
}

export interface IUsersServiceCreate {
  email: string;
  pwd: string;
  name: string;
  address: string;
  phone: string;
  SSN: string;
}
export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUserServiceSoftDelete {
  userId: string;
}

export interface IUserServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}
