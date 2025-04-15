/// <reference types="jest" />
import { rootReducer } from '../services/store';
import { constructorSlice } from './slices/constructor-slice';
import { ingredientsSlice } from '../services/slices/ingredients-slice';
import { userSlice } from '../services/slices/user-slice';
import { ordersSlice } from '../services/slices/order-slice';

describe('rootReducer', () => {
    test('должен вернуть начальное состояние', () => {
      const actualState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
      const expectedState = {
        user: userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
        ingredients: ingredientsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
        constructorItems: constructorSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }),
        orders: ordersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })
      };
      expect(actualState).toEqual(expectedState);
    });
  });
