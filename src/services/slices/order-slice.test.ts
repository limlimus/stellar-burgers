/// <reference types="jest" />
import { ordersSlice, getFeedsThunk, getOrderByNumberThunk } from './order-slice';
import { mockOrder, mockPayload } from '../../__mocks__/order'

describe('тест редьюсера слайса orders', () => {

  test('должен обработать getFeedsThunk.pending', () => {
    const action = { type: getFeedsThunk.pending.type };
    const state = ordersSlice.reducer(undefined, action);
    expect(state.isLoading).toBe(true);
  });

  test('должен обработать getFeedsThunk.fulfilled', () => {   
    const action = { type: getFeedsThunk.fulfilled.type, payload: mockPayload };
    const state = ordersSlice.reducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  test('должен обработать getFeedsThunk.rejected', () => {
    const action = { type: getFeedsThunk.rejected.type, payload: 'error message' };
    const state = ordersSlice.reducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error message');
  });

  test('должен обработать getOrderByNumberThunk.fulfilled', () => {    
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: mockOrder
    };
    const state = ordersSlice.reducer(undefined, action);
    expect(state.currentOrder).toEqual(mockOrder);
  });
});
