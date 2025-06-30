'use client'

import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Typography, Card, CardContent, Link, SelectChangeEvent } from "@mui/material";
import styles from './RatingPage.module.scss';
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveRadar } from "@nivo/radar";
import { useRouter } from "next/navigation";
import { LibraryBooks, ModeEdit } from "@mui/icons-material";
import { getAllCritea, getTopRatingWithCriteriaArray } from "@/api";
import { criterias, default_api_mocks } from "@/api/mocks";
import { Criterion, DataEntry, KeyEntry, NivoDefaultData, RatingResponse } from "@/types";
import { useDispatch } from "react-redux";
import { setRating as setRatingRedux } from "@/store/ratingSlice";

/**
 * Поворачивает значение с ключами 
 * @param {NivoDefaultData} input 
 * @returns {NivoDefaultData} Повернутая дата 
 * @example 
 * data: [{ criteria: 'Крутой', 'Первый': 5, 'Второй': 0}, { criteria: 'Классный', 'Первый': 1,  'Второй': 2}],
  keys: ['Первый', 'Второй']
  =>
  data: [{ criteria: 'Первый', 'Крутой': 5, 'Классный': 1}, { criteria: 'Второй', 'Крутой': 0, 'Классный': 2}]
  keys: ['Крутой', 'Классный'] 
 */
export function convert(input: NivoDefaultData): NivoDefaultData {
  const { keys: studentNames, data: criteriaData } = input;
  // Извлекаем названия критериев из исходного массива data
  const criteriaKeys: string[] = criteriaData.map((item) => item.criteria);

  // Преобразуем данные: для каждого студента собираем его значения по всем критериям
  const transformedData: DataEntry[] = studentNames.map((studentName) => {
    const studentData: DataEntry = {
      criteria: studentName,
    };

    criteriaData.forEach((criteriaItem) => {
      const criterion = criteriaItem.criteria;
      const value = criteriaItem[studentName]; // получаем значение по имени студента

      // Присваиваем значение критерия для студента
      studentData[criterion] = value !== undefined ? value : 0; // можно не ставить 0, если нужно сохранять undefined
    });

    return studentData;
  });

  // Возвращаем результат в нужном формате
  const result: NivoDefaultData = {
    keys: criteriaKeys,
    data: transformedData,
  };

  return result;
}

export default function RatingPage() {
  const [rating, setRating] = useState<RatingResponse | null>(null);
  const [ratingBar, setRatingBar] = useState<NivoDefaultData | null>(null);
  const [ratingRadar, setRatingRadar] = useState<NivoDefaultData | null>(null);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [selectedCriteriaIds, setSelectedCriteriaIds] = useState<number[]>([]);
  const [studentCount, setStudentCount] = useState<number>(5);
  const router = useRouter();
  const dispath = useDispatch();

  // Загрузка всех критериев при монтировании компонента
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const criteriaResponse = await getAllCritea();
        setCriteria(criteriaResponse.data);
      } catch (error) {
        setCriteria(criterias.data);
        console.error("Ошибка при загрузке критериев:", error);
      } finally {
        handleUpdate();
      }
    };

    fetchCriteria();
  }, []);

  /**
  * Добавление/Удаление критерия для запроса
  * @param criterionId - ключ, необходимый для идентификации критериев
  * @returns undefined
  */
  const handleCheckboxChange = (criterionId: number) => {
    if (selectedCriteriaIds.includes(criterionId)) {
      setSelectedCriteriaIds(selectedCriteriaIds.filter((id) => id !== criterionId));
    } else {
      setSelectedCriteriaIds([...selectedCriteriaIds, criterionId]);
    }
  };

  /**
   * Обработчик изменения количества студентов
   * @param {SelectChangeEvent<number>} event - Событие изменения значения в MUI Select
   * @returns undefined
   *  */
  const handleStudentCountChange = (event: SelectChangeEvent<number>): void => {
    const count = event.target.value as number;
    setStudentCount(count);
  };


  // Функция для обновления данных по нажатию кнопки
  const handleUpdate = async ():Promise<void> => {
    const ratingResponse: { data: RatingResponse } = { data: default_api_mocks };
    try {
      const response = await getTopRatingWithCriteriaArray({
        count: studentCount, criteriaIDs: selectedCriteriaIds, // Передаём массив ID выбранных критериев
      }) as { data: RatingResponse };
      ratingResponse.data = response.data;
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    } finally {
      setRating(ratingResponse.data);

      setRatingRadar({
        ...ratingResponse.data,
        keys: ratingResponse.data.keys.map((keyObj: KeyEntry) => Object.values(keyObj)[0]),
      });
      setRatingBar(
        convert({
          ...ratingResponse.data,
          keys: ratingResponse.data.keys.map((keyObj: KeyEntry) => Object.values(keyObj)[0]), // Преобразование keys
        })
      );
    }
  };

  const calculateTotalScores = () => {
    if (!rating) return [];

    const totalScoresC = rating.keys.map((keyObj) => {
      const studentName = Object.values(keyObj)[0];
      const totalScore = rating.data.reduce((sum, item) => sum + (Number(item[studentName]) || 0), 0);
      return {
        name: studentName,
        score: totalScore,
      };
    });

    return totalScoresC.sort((a, b) => b.score - a.score); // Сортируем по убыванию баллов
  };

  const totalScores = calculateTotalScores();

  const handleReportClick = () => {
    if (rating) {

      dispath(setRatingRedux(rating)); // ✅ Сохраняем в Redux
      router.push('/rating/report');
    }
  };

  return (
    <Box className={styles.page} sx={{ width: "100%", padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#000" }}>
        Рейтинг студентов
      </Typography>

      {/* Настройки */}
      <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
        {/* Выбор количества студентов */}
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel>Количество студентов</InputLabel>
          <Select value={studentCount} label="Количество студентов" onChange={handleStudentCountChange}>
            {[1, 2, 3, 5, 10].map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Кнопка обновления */}
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ width: { xs: "100%", sm: "auto" } }}>
          Обновить
        </Button>
      </Box>

      {/* Основной контент: выбор критериев и радар справа */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: { xs: "column", sm: "row" }, // Изменяем направление в зависимости от ширины экрана
          marginBottom: "20px",
        }}
      >
        {/* Выбор критериев */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            maxHeight: "400px", // Ограничение высоты
            overflowY: "auto", // Добавление скролла
            border: "1px solid #ccc", // Дополнительная граница для визуального разделения
            padding: "10px",
            borderRadius: "4px",
            width: { xs: "100%", sm: "50%" }, // Ширина зависит от размера экрана
          }}
        >
          <Typography variant="subtitle1">Выберите критерии:</Typography>
          {criteria.map((criterion) => (
            <FormControlLabel
              key={criterion.criteriaId}
              control={
                <Checkbox
                  checked={selectedCriteriaIds.includes(criterion.criteriaId)}
                  onChange={() => handleCheckboxChange(criterion.criteriaId)}
                />
              }
              label={criterion.name}
            />
          ))}
        </Box>

        {/* Радарный график */}
        {ratingRadar && (
          <Box

            sx={{
              height: "700px", // Явно указываем высоту с единицей измерения
              width: { xs: "100%", sm: "50%" }, // Ширина зависит от размера экрана
              maxWidth: "100%", // Ограничение максимальной ширины
              maxHeight: "700px",
              position: "relative", // Обеспечиваем правильное позиционирование
              overflow: "hidden", // Скрываем всё, что выходит за пределы контейнера
            }}

          >

            <ResponsiveRadar
              data={ratingRadar.data}
              keys={ratingRadar.keys}
              indexBy="criteria"
              margin={{ top: 20, right: 80, bottom: 0, left: 100 }}
              colors={{ scheme: "accent" }}
              dotSize={8}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              maxValue={"auto"}
              fillOpacity={0.25}
              animate={true} // Анимация для плавного отображения
              motionConfig="gentle"
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fontSize: 12, // Размер шрифта
                      fill: "#333", // Цвет текста
                      whiteSpace: "wrap", // Перенос текста
                      wordWrap: "break-word", // Разрыв слов
                    },
                  },
                },
              }}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -100,
                  translateY: 0,
                  itemWidth: 80,
                  itemHeight: 14,
                  itemTextColor: '#666',
                  symbolSize: 10,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000'
                      }
                    }
                  ]
                }
              ]}
              gridLabelOffset={0}
            />
          </Box>
        )}
      </Box>

      {/* Столбчатая диаграмма */}
      {ratingBar && (
        <Box
          sx={{
            width: "100%", // Контейнер занимает всю доступную ширину
            overflowX: "scroll", // Добавляем горизонтальный скролл
            marginTop: "20px", // Отступ сверху
          }}
        >
          <div
            style={{
              minWidth: `${ratingBar.data.length * 140}px`, // Устанавливаем фиксированную ширину для графика
              height: "400px", // Фиксированная высота
              paddingBottom: "20px"
            }}
          >
            <ResponsiveBar
              data={ratingBar.data}
              keys={ratingBar.keys}
              indexBy="criteria"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "accent" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Студенты",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Баллы",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          </div>
        </Box>
      )}


      {totalScores.length > 0 && (
        <Box sx={{ marginTop: "40px" }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#000" }}>
            Итоги рейтинга
          </Typography>
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {totalScores.map(({ name, score }, index) => {
              // Ищем ID студента в массиве keys
              const keyObj = rating?.keys.find((keyObj) => Object.values(keyObj)[0] === name);
              const studentId = keyObj ? Object.keys(keyObj)[0] : null;

              if (!studentId) {
                console.error(`ID студента "${name}" не найден`);
                return null;
              }

              // Формируем ссылку на профиль
              const profileLink = `https://lyashovilyadiplom.vercel.app/profile/${studentId}`;

              // Определяем стили для карточек
              let cardStyle = {};
              if (index === 0) {
                cardStyle = { backgroundColor: "#FFD700", borderColor: "#FFD700" }; // Золотой цвет для первого места
              } else if (index < 3) {
                cardStyle = { backgroundColor: "#C0C0C0", borderColor: "#C0C0C0" }; // Серебряный цвет для второго и третьего места
              }

              return (
                // <Link href={profileLink} target="_blank" rel="noopener noreferrer" underline="none" key={name}>
                //   <Card
                //     sx={{
                //       width: "200px",
                //       boxShadow: 3,
                //       border: "2px solid transparent",
                //       ...cardStyle,
                //       transition: "transform 0.2s",
                //       "&:hover": {
                //         transform: "scale(1.05)",
                //       },
                //     }}
                //   >
                <Card
                  key={index}
                  sx={{
                    width: { xs: "100%", sm: "calc(50% - 10px)", md: "200px" }, // Полная ширина на мобильных, две в ряд на планшетах
                    boxShadow: 3,
                    border: "2px solid transparent",
                    ...cardStyle,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    marginBottom: "20px", // Добавляем отступ между строками
                  }}
                >
                  <Link href={profileLink} target="_blank" rel="noopener noreferrer" underline="none" key={name} style={{ width: "100%", color: "black", textDecoration: "none" }}>

                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
                        {name}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: "10px", textAlign: "center" }}>
                        Итоговый балл: {score}
                      </Typography>
                    </CardContent>
                  </Link>

                </Card>
              );
            })}
          </Box>
        </Box>
      )}
      {rating && <Box sx={{ marginTop: "30px", display: "flex", gap: "15px", flexDirection: { xs: "column", sm: "row" } }} >
        <Button startIcon={<ModeEdit />} sx={{ fontSize: "min(3vw,14px)" }} variant="contained" size="medium"
          onClick={handleReportClick}
        >
          {/* <Button startIcon={<ModeEdit />} sx={{ fontSize: "min(3vw,14px)" }} variant="contained" size="medium" onClick={() => { navigate("/rating/report", { state: { rating: rating } }) }}> */}
          Сформировать отчет
        </Button>
        <Button startIcon={<LibraryBooks />} sx={{ fontSize: "min(3vw,14px)" }} variant="contained" size="medium" onClick={() => router.push("/rating/docs")}>
          Перейти к проверке документов
        </Button>
      </Box>
      }
    </Box>
  );
};