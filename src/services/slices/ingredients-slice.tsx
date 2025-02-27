import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    try {
      const data = await getIngredientsApi();
      console.log('запрос ингредиентов')
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export interface ingredientsState {
  isLoading: boolean;
  ingredients: TIngredient[] | [];
  error: string | null;
}

const initialState: ingredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearIngredients: (state) => {
      state.ingredients = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  selectors: {
    getIngredientSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredients = payload;
    });
  }
});

export const { setIngredients, setError, setLoading, clearIngredients } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
