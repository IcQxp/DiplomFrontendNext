'use client'
import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react"
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import styles from "./HomePage.module.scss"
import { BarChart } from "@mui/icons-material"
import { Loading } from "@/components/Loading/Loading";
import { getAllCritea, getTopRatingWithCriteriaArray } from "@/api";
import { NewsList } from "@/components/News/News";
import { Criterion, RatingResponse } from "@/types";
import { useRouter } from "next/navigation";
import { StudentTopNote } from "@/components/StudentTopNote/StudentTopNote";

const HomePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [rating, setRating] = useState<RatingResponse>();


  useEffect(() => {
    const FD = async () => {
      try {
        const criteriaResponse: Criterion[] = (await getAllCritea()).data;
        const response = await getTopRatingWithCriteriaArray({ count: 3, criteriaIDs: criteriaResponse.map(item => item.criteriaId) });
        setRating(response.data);
      }
      catch (error) {
        console.warn("Ошибка при получении данных:", error);
      }
      finally {
        setLoading(false);
      }
    }
    FD()
  }, [])

  const calculateRatings = () => {
    if (!rating) return [];

    const studentRatings: { name: string; id: number; totalScore: number; }[] = [];

    // Проходим по каждому объекту в rating.keys
    rating.keys.forEach((keyObj) => {
      // Получаем id (ключ объекта) и имя (значение)
      const id = parseInt(Object.keys(keyObj)[0]); // "3" -> 3
      const name = keyObj[id]; // значение по id

      // Считаем общую сумму баллов по всем критериям
      const totalScore = rating.data.reduce((sum, dataItem) => {
        const score = dataItem[name];
        return sum + (typeof score === "number" ? score : 0);
      }, 0);

      // Добавляем данные в массив
      studentRatings.push({
        name,
        id,
        totalScore,
      });
    });

    // Сортируем по убыванию рейтинга
    return studentRatings.sort((a, b) => b.totalScore - a.totalScore);
  };

  const sortedStudents = calculateRatings();


  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <h2 className={styles.top__title}>
          Наши лучшие студенты
        </h2>
        {loading ? (
          <Loading size={20} type="rating-3" />
        ) : sortedStudents.length > 0 ? (
          sortedStudents.map(({ name, totalScore, id }, index) => (
            <StudentTopNote name={name} totalScore={totalScore} id={id} index={index} key={name} />
          ))
        ) : (
          <div>ПУСТО</div>
        )}
      </div>
      <Button startIcon={<BarChart />} variant="contained" size="medium" onClick={() => { router.push("/rating") }} sx={{ margin: "20px 40px" }}>
        Перейти к рейтингу
      </Button>
      <NewsList />
    </div>
  )
}

export default HomePage;