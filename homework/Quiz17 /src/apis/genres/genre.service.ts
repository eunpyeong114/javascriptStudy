import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import {
  IGenreServiceBulkInsert,
  IGenreServiceFindByNames,
} from './interfaces/genre.interface';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findByNames({ genre }: IGenreServiceFindByNames): Promise<Genre[]> {
    return this.genreRepository.find({ where: { name: In(genre) } });
  }
  bulkInsert({ tempGenre }: IGenreServiceBulkInsert): Promise<InsertResult> {
    return this.genreRepository.insert(tempGenre);
  }
}
