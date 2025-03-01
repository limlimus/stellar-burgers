import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { updateUserThunk } from '../../services/thunks/user-thunks';
export const Profile: FC = () => {
  const user = useSelector((store) => store.user.data.user);
  const userIsLoading = useSelector((store) => store.user.isLoading);
  const dispatch = useDispatch();

  if (!user || userIsLoading) {
    return <Preloader />;
  }
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;
    const userData = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password
    };
    try {
      await dispatch(updateUserThunk(userData)).unwrap();
      alert('Данные успешно обновлены');
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      alert('Не удалось обновить данные');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
