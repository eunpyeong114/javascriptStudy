import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { Director } from './entities/director.entity';
import {
  IDirectorServiceBulkInsert,
  IDirectorServiceFindByNames,
} from './interfaces/director-service.interface';

Injectable();
export class DirectorService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}
  findByNames({ director }: IDirectorServiceFindByNames): Promise<Director[]> {
    return this.directorRepository.find({ where: { name: In(director) } });
  }
  bulkInsert({
    tempDirector,
  }: IDirectorServiceBulkInsert): Promise<InsertResult> {
    return this.directorRepository.insert(tempDirector);
  }
}
