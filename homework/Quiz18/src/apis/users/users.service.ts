import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import {
  IUserServiceFindOne,
  IUserServiceSoftDelete,
  IUserServiceUpdate,
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/users.service.interface';
import { UpdateUserObject } from './dto/update-user.object';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, //
  ) {}

  findOne({ userId }: IUserServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async create({
    email,
    pwd,
    name,
    address,
    phone,
    SSN,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('클라이언트에서 받을 때가 아닙니다.');

    const hashedPassword = await bcrypt.hash(pwd, 10);
    return this.usersRepository.save({
      email,
      pwd: hashedPassword,
      name,
      address,
      phone,
      SSN,
    });
  }

  async updateUser({
    userId,
    updateUserInput,
  }: IUserServiceUpdate): Promise<User> {
    const user = await this.findOne({ userId });
    console.log(user);
    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
    // const result = await this.usersRepository.update(
    //   {
    //     id: user.id,
    //   },
    //   { ...updateUserInput },
    // );
    // return result.affected ? true : false;
  }
  async softDeleteUser({ userId }: IUserServiceSoftDelete): Promise<boolean> {
    const result = await this.usersRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async restoreUser({ userId }): Promise<boolean> {
    const result = await this.usersRepository.restore({ id: userId });
    return result.affected ? true : false;
  }
}
