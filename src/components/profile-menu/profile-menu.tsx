import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, RootState, useSelector } from '../../services/store';
import { logoutUserThunk } from '../../services/thunks/user-thunks';
import { Preloader } from '../../components/ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state: RootState) => state.user);
  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate('/');
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />
  );
};
