import {
  userSlice,
  setInit,
  setLoading,
  setError,
  setUserOrders,
  setLogout
} from './user-slice';
import {
  initialState,
  mockOrders,
  mockUser,
  stateWithUser
} from '../../__mocks__/user';

describe('тест редьюсера слайса user', () => {
  test('должен обработать setLoading(true)', () => {
    const action = setLoading(true);
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('должен обработать setInit(user)', () => {
    const action = setInit(mockUser);
    const state = userSlice.reducer(initialState, action);
    expect(state.data.user).toEqual(mockUser);
    expect(state.isInit).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('должен обработать setError("error message")', () => {
    const action = setError('error message');
    const state = userSlice.reducer(initialState, action);
    expect(state.error).toBe('error message');
    expect(state.isLoading).toBe(false);
    expect(state.isInit).toBe(false);
  });

  test('должен обработать setUserOrders([orders])', () => {
    const action = setUserOrders(mockOrders);
    const state = userSlice.reducer(initialState, action);
    expect(state.data.userOrders).toEqual(mockOrders);
  });

  test('должен обработать setLogout()', () => {
    const state = userSlice.reducer(stateWithUser, setLogout());
    expect(state.data.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
