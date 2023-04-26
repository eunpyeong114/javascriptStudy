import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionsServiceCheckDuplication {
  impUid: string;
}
export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
