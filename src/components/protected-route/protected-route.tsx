import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';
interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const isInit = useSelector((store: RootState) => store.user.isInit);
  const userIsLoading = useSelector((store: RootState) => store.user.isLoading);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  if (userIsLoading) {
    return <Preloader />;
  }
  if (isInit) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
