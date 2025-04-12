import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const userIsLoading = useSelector((store) => store.user.isLoading);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const from = location.state?.from || '/';

  if (userIsLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
