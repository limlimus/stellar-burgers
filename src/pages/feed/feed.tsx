import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { getFeedsThunk } from '../../services/slices/order-slice';
import { TIngredient } from '@utils-types';
import { getIngredientsThunk} from '../../services/slices/ingredients-slice'

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const orders = useSelector((store: RootState) => store.orders.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeedsThunk());
    }
  }, [dispatch, orders.length]);

  const ingredients: TIngredient[] = useSelector(
      (store: RootState) => store.ingredients.ingredients
    );
  
    useEffect(() => {
      if (ingredients.length === 0) {
        dispatch(getIngredientsThunk());
      }
    }, [dispatch, ingredients.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
