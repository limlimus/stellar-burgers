import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, RootState, useSelector } from '../../services/store';
import { getRegisterUser } from '../../services/thunks/user-thunks';
import { Preloader } from '../../components/ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password || !userName) {
      return;
    }
    dispatch(getRegisterUser({ email, name: userName, password }));
    navigate('/');
  };

  const [errors, setErrors] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { userName: '', email: '', password: '' };

    if (!userName.trim()) {
      newErrors.userName = 'Введите имя';
      isValid = false;
    } else if (userName.length < 2) {
      newErrors.userName = 'Имя должно быть от 2 символов';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Введите e-mail';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Некорректный e-mail';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть от 6 символов';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
