import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { data } = useSelector((store: RootState) => store.user);
  const isAuth = useSelector((store) => store.user.isAuthenticated);
  return <AppHeaderUI userName={data.user?.name} />;
};
