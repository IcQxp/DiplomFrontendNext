// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Редирект на /home при заходе на /
  router.push('/home');

  return null; // Можно добавить лоадер, если нужно
}