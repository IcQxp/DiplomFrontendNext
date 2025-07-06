'use client'
import { useRouter } from "next/navigation";
import styles from "./NotFoundPage.module.scss"
import { Button } from "@mui/material"

export const NotFoundPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/home");
  };
  return (
    <div className={styles.page}>
      <img src="/icons/notFound.svg" />
      <p className={styles.title}>Страница не найдена            </p>
      <Button size="medium" variant="contained" onClick={handleClick} sx={{ fontFamily: 'var(--font-react)' }}>
        Вернуться на главную
      </Button>
    </div>
  )
}