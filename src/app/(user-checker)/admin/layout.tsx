'use client'
import { useRouter } from "next/navigation";
import "@/app/global.scss"

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserResponse } from "@/types";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();
  const user: UserResponse | null = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }

    if (user && user.rolename !== 'admin') {
      router.push('/auth');
    }
  }, [user, router]);


  if (!user || user.rolename !== 'admin') return null;
  return (
    <>
    {children}
    </>
  )
}



