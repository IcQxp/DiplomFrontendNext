'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./AuthPage.module.scss"
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Key from '@mui/icons-material/Key';
import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { RootState } from '@/store';
import { postLogin } from '@/api';
import { UserDataPaylod } from '@/types';

export interface UserResponse {
  lastname?: string;
  firstname?: string;
  patronymic?: string;
  login?: string;
  gender?: string;
  id: number;
  email?: string;
  telephone?: string;
  rolename?: string;
  roleId: number;
  birthDate: string;
}

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const dispatch = useDispatch();

  const fromPath = searchParams.get('redirect') || '/home';
  const user = useSelector((state: RootState) => state.user.userInfo);

  // Используем useEffect для навигации

  useEffect(() => {
    if (user) {
      router.push(fromPath); // ✅ Редирект через router.push
    }
  }, [user]);






  const handleLogin = async () => {
    try {
      const userPayload: UserDataPaylod = {
        username: login,
        password: password,
        isEmployee: isEmployee,
      };
      const response = await postLogin(userPayload);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      alert(response.status == 200 ? "Успешно" : "Ошибка");
      if (response.status == 200) {
        // navigate("/home");

        router.push(fromPath);
        dispatch(setUser(response.data.user));

      }
    } catch (err: any) {
      console.error(err);
    }
  };


  // const minLength = 8;
  return (
    <main className={styles.page} >
      <div className={styles.container}>
        <h2 className={styles.title}> Вход </h2>
        <div className={styles.login__container}>
          <p className={styles.login__title}>Login</p>
          <Input color="neutral" variant="outlined" placeholder='Login'
            type='login'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
            value={login} className={styles.input}
          // sx={{fontFamily: 'PixelizerBold'}}
          />
        </div>
        <div className={`${styles.password__container} ${styles.input}`}>
          <p className={styles.password__title}>Password</p>
          <Stack spacing={0.5} sx={{ '--hue': Math.min(password.length * 10, 120) }} >
            <Input
              className={styles.input}
              type="password"
              placeholder="Введите пароль…"
              startDecorator={<Key />}
              value={password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            />

          </Stack>



        </div>
        <div className={`${styles.buttons__container}`} >
          <div>
            <label htmlFor='employeeCheckBox' className={styles.checkbox__label}>
              Войти как администратор
            </label>
            <Checkbox id='employeeCheckBox' checked={isEmployee} onChange={(e) => setIsEmployee(e.target.checked)} />
          </div>

          <Button size="small" variant="contained" onClick={handleLogin}>Войти</Button>

        </div>
      </div>
    </main>
  );
};

export default AuthPage;