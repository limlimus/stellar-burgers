import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsThunk } from '../../services/slices/order-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const handleGetFeeds = useCallback(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const orders = useSelector((store) => store.orders.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeedsThunk());
    }
  }, [dispatch, orders.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
