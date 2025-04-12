import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TOrder } from '../../utils/types';
import {
  loginUserThunk,
  getUserThunk,
  getRegisterUser,
  updateUserThunk,
  getUserOrdersThunk,
  logoutUserThunk
} from '../thunks/user-thunks';

export type TData = {
  user: TUser | null;
  userOrders: TOrder[] | [];
};

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  data: TData;
  error: string | null;
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean; // флаг, который показывает, авторизован ли пользователь
  loginUserError: null | string; // ошибка при попытке авторизации
  loginUserRequest: boolean; // флаг, который показывает, идет ли запрос на авторизацию
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  data: {
    user: null,
    userOrders: []
  },
  error: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<TUser>) => {
      state.data.user = action.payload;
      state.isInit = true;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isInit = false;
      state.isLoading = false;
    },
    setUserOrders: (state, action: PayloadAction<TOrder[]>) => {
      state.data.userOrders = action.payload;
    },
    setLogout: (state) => {
      state.data.user = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.loginUserRequest = true;
      })
      .addCase(loginUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.loginUserRequest = false;
        state.error = payload as string;
      })
      .addCase(loginUserThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data.user = payload;
          state.isLoading = false;
          state.isAuthChecked = true;
          state.isAuthenticated = true;
        }
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isInit = true;
        state.error = payload as string;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.data.user = payload.user;
        state.isInit = true;
        state.isLoading = false;
        state.isAuthenticated = true;
      })

      .addCase(getRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserRequest = true;
      })
      .addCase(getRegisterUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.loginUserRequest = false;
        state.error = payload as string;
      })
      .addCase(getRegisterUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data.user = payload.user;
      })

      .addCase(getUserOrdersThunk.pending, (state) => {})
      .addCase(getUserOrdersThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.data.userOrders = payload;
        }
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.user = payload;
      })

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.data.user = null;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { setInit, setError, setLoading, setUserOrders, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
