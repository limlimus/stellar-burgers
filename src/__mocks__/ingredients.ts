import { TConstructorIngredient } from '../utils/types';

export const bun: TConstructorIngredient = {
  _id: '1',
  id: 'bun-id',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  proteins: 0
};

export const ing1: TConstructorIngredient = {
  _id: '2',
  id: 'ing-1',
  name: 'Начинка 1',
  type: 'main',
  price: 50,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  proteins: 0
};

export const ing2: TConstructorIngredient = {
  _id: '3',
  id: 'ing-2',
  name: 'Начинка 2',
  type: 'sauce',
  price: 70,
  image: '',
  image_mobile: '',
  image_large: '',
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  proteins: 0
};

export const mockIngredients = [
    { _id: '1', name: 'Булка', type: 'bun', price: 50 } as const,
    { _id: '2', name: 'Котлета', type: 'main', price: 100 } as const
  ];
