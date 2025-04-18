import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { data } = useSelector((store) => store.user);
  return <AppHeaderUI userName={data.user?.name} />;
};
