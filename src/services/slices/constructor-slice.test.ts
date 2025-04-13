import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  MoveUpIngredient,
  MoveDownIngredient
} from './consructor-slice';
import { bun, ing1, ing2 } from '../../__mocks__/ingredients';

describe('тест редьюсера слайса constructor', () => {
  test('добавление булки', () => {
    const state = constructorSlice.reducer(undefined, addIngredient(bun));
    expect(state.constructorItems.bun).toEqual(bun);
  });

  test('добавление начинки', () => {
    const state = constructorSlice.reducer(undefined, addIngredient(ing1));
    expect(state.constructorItems.ingredients).toContainEqual(ing1);
  });

  test('удаление ингредиента', () => {
    const prevState = {
      isLoading: false,
      constructorItems: {
        bun: undefined,
        ingredients: [ing1, ing2]
      },
      error: null,
      orderRequest: false
    };
    const state = constructorSlice.reducer(prevState, removeIngredient(ing1));
    expect(state.constructorItems.ingredients).toEqual([ing2]);
  });

  test('поднятие ингредиента вверх по списку', () => {
    const prevState = {
      isLoading: false,
      constructorItems: {
        bun: undefined,
        ingredients: [ing2, ing1]
      },
      error: null,
      orderRequest: false
    };
    const state = constructorSlice.reducer(prevState, MoveUpIngredient(1));
    expect(state.constructorItems.ingredients).toEqual([ing1, ing2]);
  });

  test('should move ingredient down', () => {
    const prevState = {
      isLoading: false,
      constructorItems: {
        bun: undefined,
        ingredients: [ing1, ing2]
      },
      error: null,
      orderRequest: false
    };
    const state = constructorSlice.reducer(prevState, MoveDownIngredient(0));
    expect(state.constructorItems.ingredients).toEqual([ing2, ing1]);
  });
});
