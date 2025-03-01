import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  getOrdersApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';
import { TUser, TRegisterData } from '../../utils/types';

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async ({ login, password }: { login: string; password: string }) => {
    const data = await loginUserApi({ email: login, password });
    if (data?.success) {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      const userResponse = await getUserApi();
      if (userResponse.success) {
        return userResponse.user;
      }
      return Promise.reject('Login failed');
    }
  }
);

//Получает данные пользователя, используя актуальный accessToken.
export const getUserThunk = createAsyncThunk('users/getUser', async (_) => {
  const response = await getUserApi();
  if (response?.success) {
    return response;
  }
  return Promise.reject('Error: Failed to fetch user data');
});

export const getRegisterUser = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    if (response?.success) {
      return response;
    }
    return Promise.reject('Registration failed');
  }
);

export const updateUserThunk = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'users/updateUser',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    if (response?.success) {
      return response.user;
    }
    return Promise.reject('Failed to update user data');
  }
);

export const logoutUserThunk = createAsyncThunk(
  'users/logoutUer',
  async (_) => {
    await logoutApi();
    return {};
  }
);

export const getUserOrdersThunk = createAsyncThunk(
  'users/getUserOrders',
  async (_) => {
    const orders = await getOrdersApi();
    if (orders) {
      return orders;
    }
    return Promise.reject('Failed to update user data');
  }
);
