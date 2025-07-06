// 'use client'

// import { getMe } from "@/api";
// import { setUser } from "@/store/userSlice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// export default  function AuthChecker({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState<boolean>(true);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const loadUser = async () => {
//       if (token) {
//         try {
//           const response = await getMe(token);
//           dispatch(setUser(response.data.user));
//         } catch (error) {
//           console.error('Error loading user:', error);
//           // localStorage.removeItem('token');
//         }
//       }
//       setLoading(false);
//     };

//     loadUser();
//   }, [dispatch, token]);

//   if (loading) return <div>Загрузка</div>

//   return (<>{children}</>)
// }

'use client'

import { getMe } from "@/api";
import { setUser } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Получаем токен только при монтировании компонента (в браузере)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setToken(token);

    const loadUser = async () => {
      if (token) {
        try {
          const response = await getMe(token);
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error('Ошибка загрузки пользователя:', error);
          // localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>

  return <>{children}</>
}