import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

export const getFeedsThunk = createAsyncThunk('orders/getFeeds', async (_) => {
  try {
    const response = await getFeedsApi();
    if (response?.success) {
      return response;
    }
    return Promise.reject('Get orders failed');
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getOrderByNumberThunk = createAsyncThunk(
  'orders/getOrderByNumber',
  async (orderNumber: number) => {
    try {
      const response = await getOrderByNumberApi(orderNumber);
      if (response?.success) {
        return response.orders[0];
      }
      return Promise.reject('Get order failed');
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export interface orderState {
  isLoading: boolean;
  orders: TOrder[] | [];
  total: number | null;
  totalToday: number | null;
  error: string | null;
  currentOrder: TOrder | null;
}

const initialState: orderState = {
  isLoading: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null,
  currentOrder: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrder: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    }
  },
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })

      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        getOrderByNumberThunk.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrder = action.payload;
        }
      );
  }
});

export const { setError, setLoading, setOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
