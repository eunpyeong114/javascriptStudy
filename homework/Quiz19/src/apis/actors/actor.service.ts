import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import {
  IActorServiceBulkInsert,
  IActorServiceFindByNames,
} from './interfaces/actor-service.interface';
Injectable();
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}
  findByNames({ actor }: IActorServiceFindByNames): Promise<Actor[]> {
    return this.actorRepository.find({ where: { name: In(actor) } });
  }
  bulkInsert({ tempActor }: IActorServiceBulkInsert): Promise<InsertResult> {
    return this.actorRepository.insert(tempActor);
  }
}
