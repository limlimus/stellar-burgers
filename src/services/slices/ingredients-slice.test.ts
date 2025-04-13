import {
  ingredientsSlice,
  setError,
  getIngredientsThunk
} from './ingredients-slice';
import { mockIngredients } from '../../__mocks__/ingredients';

describe('тест редьюсера слайса ingredients', () => {
  test('должен установить isLoading в true при pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.isLoading).toBe(true);
  });

  test('должен установить данные и isLoading в false при fulfilled', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.isLoading).toBe(false);
  });

  test('должен установить isLoading в false при rejected', () => {
    const action = { type: getIngredientsThunk.rejected.type };
    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.isLoading).toBe(false);
  });

  test('должен записать ошибку при setError', () => {
    const action = setError('ошибка!');
    const state = ingredientsSlice.reducer(undefined, action);
    expect(state.error).toBe('ошибка!');
  });
});
