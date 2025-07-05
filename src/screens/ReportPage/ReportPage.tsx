'use client'
import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import styles from "./ReportPage.module.scss"
import { CommentsList, RatingResponse } from "@/types";
import { ReportPdfView } from "@/components/ReportPdfView/ReportPdfView";
import { CommentInput } from "@/components/Report/CommentInput/CommentInput";
import { ChartContainer } from "@/components/Ratings/Charts/ChartContainer/ChartContainer";
import { useRating } from "@/hooks/useRating";
import { useRatingConvert } from "@/hooks/useRatingConvert";
import { CaptureButton } from "@/components/Ratings/CaptureButton/CaptureButton";

export default function ReportComp() {
  const rating: RatingResponse | null = useRating();
  const { ratingBar, ratingRadar } = useRatingConvert(rating);
  const barRef = useRef<HTMLDivElement>(null); // Ссылка на столбчатый график
  const radarRef = useRef<HTMLDivElement>(null); // Ссылка на радарный график
  const [barImage, setBarImage] = useState<string | null>(null); // Изображение столбчатого графика
  const [radarImage, setRadarImage] = useState<string | null>(null); // Изображение радарного графика
  const [comments, setComments] = useState<CommentsList>({
    title: "Отчет по рейтингу",
    comment1: "Комментарий к первому графику",
    comment2: "Комментарий ко второму графику"
  });

  const handleChange = useCallback((field: keyof typeof comments) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComments(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const captureCharts = async () => {
    if (barRef.current && radarRef.current) {
      const barCanvas = await html2canvas(barRef.current);
      const radarCanvas = await html2canvas(radarRef.current);
      setBarImage(barCanvas.toDataURL("image/png"));
      setRadarImage(radarCanvas.toDataURL("image/png"));
    }
  };

  return (
    <div className={styles.container}>
      <CommentInput label="Заголовок отчета" comment={comments.title} rowsCount={2} onChange={handleChange('title')} />
      <CommentInput label="Комментарий к первому графику" comment={comments.comment1} rowsCount={3} onChange={handleChange('comment1')} />
      {ratingBar && <ChartContainer type='bar' rating={ratingBar} ref={barRef} />}
      <CommentInput label="Комментарий ко второму графику" comment={comments.comment2} rowsCount={3} onChange={handleChange('comment2')} />
      {ratingRadar && <ChartContainer type='radar' rating={ratingRadar} ref={radarRef} />}
      <CaptureButton captureCharts={captureCharts} />
      {(barImage && radarImage) &&
        <ReportPdfView barImage={barImage} radarImage={radarImage} ratingBar={ratingBar} comment1={comments.comment1} comment2={comments.comment2} title={comments.title} />
      }
    </div>
  );
};