import { Injectable, Scope } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';
import { ICreateStarbucksInput } from './interfaces/boards-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  getBoards(): Starbucks[] {
    const result = [
      {
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
    ];
    return result;
  }
  create({ createStarbucksInput }: ICreateStarbucksInput): string {
    console.log(createStarbucksInput.menu);
    console.log(createStarbucksInput.price);
    console.log(createStarbucksInput.kcal);
    console.log(createStarbucksInput.saturated_fat);
    console.log(createStarbucksInput.protein);
    console.log(createStarbucksInput.salt);
    console.log(createStarbucksInput.sugar);
    console.log(createStarbucksInput.caffeine);
    return '등록에 성공하였습니다.';
  }
}
