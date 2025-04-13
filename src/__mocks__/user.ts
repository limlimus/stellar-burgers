import { TOrder, TUser } from '../utils/types';

export const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

export const initialState = {
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

export const mockOrders: TOrder[] = [
  {
    _id: '1',
    name: 'Order 1',
    status: 'done',
    ingredients: [],
    createdAt: '',
    updatedAt: '',
    number: 1
  }
];

export const stateWithUser = {
  ...initialState,
  data: {
    user: { email: 'user@example.com', name: 'User' },
    userOrders: []
  },
  isLoading: true,
  error: 'Some error'
};

