import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // this.pointsTransactionsRepository.create(); // 등록을 위한 빈 객체 생성 //db랑 전혀 상관이 없음
    // this.pointsTransactionsRepository.insert(); // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update(); // 결과는 못 받는 수정 방법

    //this.dataSource.createQueryBuilder().select("*").from("user").where("1>true") //쿼리문 작성(디테일한 쿼리 작성)을 typeORM에서 하고 싶을 때
    // transaction 기능 줌
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // commmit이 되었든 rollback이 되었든 한번 끝나면 연결 끊어줘야함 => finally
    await queryRunner.startTransaction(); // DB에 알려줌 transaction 쓸거야

    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        //db에 접속하지 않기 때문에 await 필요없음 // 밑의 save로 전달인자 넣어주고 await 걸어줌
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction); // 아직 DB에 최종 등록되는 건 아님// 확정 전상태

      // 2. 유저의 돈 찾아오기(조회)
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트(수정)
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      // 4. 최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // transaction 전체 취소
    } finally {
      await queryRunner.release(); // queryRunner 연결 해제해줘 (실패 / 성공 상관 없이)
      //                           // release가 없으면, commit(성공)이 끝나도 connection이 안끊겨서 문제가 됨(하지만, 에러가 나면 자동으로 끊김)
    }
  }
}
