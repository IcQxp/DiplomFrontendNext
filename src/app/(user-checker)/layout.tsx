'use client'
import AuthChecker from "@/components/AuthChecker/AuthChecker"
import { RootState } from "@/store";
import { UserResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const router = useRouter();
  // const user: UserResponse | null = useSelector((state: RootState) => state.user.userInfo);

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth');
  //   }

  //   if (user && user.rolename !== 'Администратор') {
  //     router.push('/auth');
  //   }
  // }, [user, router]);


  // if (!user || user.rolename !== 'Администратор') return null;

  return (
    <AuthChecker>
      {children}
    </AuthChecker>
  )
};