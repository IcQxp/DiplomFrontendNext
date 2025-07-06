'use client'
import AuthPage from "@/screens/AuthPage/AuthPage"
import { Suspense } from "react"

export default function Auth() {
  return (
    <Suspense fallback="Загрузка...">
      <AuthPage />
    </Suspense>
  )
}