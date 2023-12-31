import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { POINT_TRANSACTION_STATUS_ENUM } from './entities/pointTransaction.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 생성 //db랑 전혀 상관이 없음
    // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법

    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointsTransactionsRepository.create({
      //db에 접속하지 않기 때문에 await 필요없음 // 밑의 save로 전달인자 넣어주고 await 걸어줌
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointsTransactionsRepository.save(pointTransaction);
    // 2. 유저의 돈 찾아오기(조회)
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 3. 유저의 돈 업데이트
    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );
    //
    // 4. 최종결과 브라우저에 돌려주기
    return pointTransaction;
  }
}
