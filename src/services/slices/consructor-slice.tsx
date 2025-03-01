import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { orderBurgerApi } from '@api';

export const orderBurgerThunk = createAsyncThunk(
  'constructor/orderBurger',
  async (ingredientIds: string[]) => {
    try {
      const response = await orderBurgerApi(ingredientIds);

      if (response?.success) {
        return response;
      }
      return Promise.reject('Order failed');
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export type TConstructorItems = {
  bun?: TIngredient;
  ingredients: TConstructorIngredient[];
};
export interface constructorState {
  isLoading: boolean;
  constructorItems: TConstructorItems;
  error: string | null;
  orderRequest: boolean;
}

const initialState: constructorState = {
  isLoading: false,
  constructorItems: {
    ingredients: []
  },
  error: null,
  orderRequest: false
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems?.ingredients.push(action.payload);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (item) => item.id !== action.payload.id
          );
      }
    },
    MoveUpIngredient: (state, action: PayloadAction<number>) => {
      const findIngredient = state.constructorItems.ingredients[action.payload];

      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        findIngredient
      );
    },
    MoveDownIngredient: (state, action: PayloadAction<number>) => {
      const findIngredient = state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(
        action.payload + 1,
        0,
        findIngredient
      );
    }
  },
  selectors: {
    getConstructorIdSelector: (state) =>
      state.constructorItems.ingredients.map((ingredient) => ingredient.id)
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.orderRequest = true;
      })
      .addCase(orderBurgerThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.error = payload as string;
      })
      .addCase(orderBurgerThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.constructorItems = { bun: undefined, ingredients: [] };
      });
  }
});
export const {
  setError,
  setLoading,
  addIngredient,
  removeIngredient,
  MoveUpIngredient,
  MoveDownIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
