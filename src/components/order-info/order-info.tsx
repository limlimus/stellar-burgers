import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { RootState, useSelector, useDispatch } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';
import {
  getOrderByNumberThunk,
  getFeedsThunk
} from '../../services/slices/order-slice';
import { getIngredientsThunk } from '../../services/slices/ingredients-slice';

export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.orders.orders);
  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeedsThunk());
    }
  }, [dispatch, orders.length]);
  const ingredients: TIngredient[] | [] = useSelector(
    (store: RootState) => store.ingredients.ingredients
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredientsThunk());
    }
  }, [dispatch]);

  const { number } = useParams<{ number: string }>();
  const orderData = useMemo(
    () =>
      orders.find((order) => order.number.toString() === number) ||
      location.state?.order ||
      null,
    [orders, number, location.state]
  );

  const orderNumber = number ? parseInt(number, 10) : 0;
  useEffect(() => {
    if (!orderData && orderNumber > 0) {
      dispatch(getOrderByNumberThunk(orderNumber));
    }
  }, [orderData, number, dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo: TIngredientsWithCount = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId: string) => {
        if (!acc[itemId]) {
          const ingredient = ingredients.find((ing) => ing._id === itemId);
          if (ingredient) {
            acc[itemId] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[itemId].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce<number>(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);
  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
