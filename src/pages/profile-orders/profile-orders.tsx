import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersThunk } from '../../services/thunks/user-thunks';
import { shallowEqual } from 'react-redux';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (store) => store.user.data.userOrders,
    shallowEqual
  );

  return <ProfileOrdersUI orders={orders} />;
};
