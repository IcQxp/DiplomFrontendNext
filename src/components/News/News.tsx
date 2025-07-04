import styles from "./News.module.scss";

interface NewsPost {
id: number;
title: string;
description: string;
date: string;
imageUrl: string;
}

const newsData: NewsPost[] = [
  {
    id: 1,
    title: "Новая программа магистратуры",
    description:
      "Университет запускает новую программу магистратуры в области искусственного интеллекта.",
    date: "15 октября 2023",
    imageUrl: "/images/1.jpg",
  },
  {
    id: 2,
    title: "День открытых дверей",
    description:
      "Приглашаем будущих студентов на день открытых дверей, чтобы узнать больше о наших программах.",
    date: "20 октября 2023",
    imageUrl: "/images/2.jpg",
  },
  {
    id: 3,
    title: "Студенческая конференция",
    description:
      "Студенты представят свои научные работы на ежегодной конференции.",
    date: "25 октября 2023",
    imageUrl: "/images/3.jpg",
  },
  {
    id: 4,
    title: "Стипендии для аспирантов",
    description:
      "Объявлен конкурс на получение стипендий для аспирантов на 2024 год.",
    date: "1 ноября 2023",
    imageUrl: "/images/4.jpg",
  },
];

export const NewsList = () => {
  return (
    <div id="news" className={styles.news}>
      <h2 className={styles.news__title}>Последние новости университета</h2>
      <div className={styles.news__list}>
        {newsData.map((item) => (
          <div key={item.id} className={styles['news-item']}>
            <img src={item.imageUrl} alt={item.title} className={styles['news-item__image']} />
            <div className={styles['news-item__content']}>
              <h3 className={styles['news-item__title']}>{item.title}</h3>
              <p className={styles['news-item__description']}>{item.description}</p>
              <div className={styles['news-item__meta']}>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};