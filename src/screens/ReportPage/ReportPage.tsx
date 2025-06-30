'use client'
import { useEffect, useRef, useState } from "react";
import { Document, Page, View, Image, Text, Font, PDFViewer } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveRadar } from "@nivo/radar";
// import { useLocation, useNavigate } from "react-router-dom";
import stylesImp from "./ReportPage.module.scss"
import { Button } from "@mui/material";
import { StackedBarChart } from "@mui/icons-material";
import { nivoDiagramm } from "@/components/RatingsWithArray/RatingsWithArray";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NivoDefaultData } from "@/types";
import { convert } from "../RatingPage/RatingPage";
import { ReportPdfView } from "@/components/ReportPdfView/ReportPdfView";


export default function ReportComp  ()  {
  const router = useRouter();
  const rating = useSelector((state: RootState) => state.rating.data);
  const [ratingBar, setRatingBar] = useState<nivoDiagramm>();
  const [ratingRadar, setRatingRadar] = useState<NivoDefaultData>();

  useEffect(() => {
    if (!rating || !rating.keys || rating.keys.length === 0) {
      router.push("/rating");
      return;
    }

    try {
      setRatingBar(convert({
        ...rating,
        keys: rating.keys.map((keyObj) => Object.values(keyObj)[0]),
      }));

      setRatingRadar({
        ...rating,
        keys: rating.keys.map((keyObj) => Object.values(keyObj)[0]),
      });
    } catch (error) {
      console.error("Ошибка при обработке рейтинга:", error);
      router.push("/rating");
    }
  }, [rating]);

  const barRef = useRef(null); // Ссылка на столбчатый график
  const radarRef = useRef(null); // Ссылка на радарный график
  const [barImage, setBarImage] = useState<string | null>(null); // Изображение столбчатого графика
  const [radarImage, setRadarImage] = useState<string | null>(null); // Изображение радарного графика
  const [title, setTitle] = useState<string>("Отчет по рейтингу"); // Заголовок отчета
  const [comment1, setComment1] = useState<string>("Комментарий к первому графику"); // Комментарий к первому графику
  const [comment2, setComment2] = useState<string>("Комментарий ко второму графику"); // Комментарий ко второму графику

  // Функция для захвата графиков
  const captureCharts = async () => {
    if (barRef.current) {
      const barCanvas = await html2canvas(barRef.current);
      setBarImage(barCanvas.toDataURL("image/png"));
    }

    if (radarRef.current) {
      const radarCanvas = await html2canvas(radarRef.current);
      setRadarImage(radarCanvas.toDataURL("image/png"));
    }
  };

  return (
    <div className={stylesImp.container}>
      {/* Ввод заголовка */}
      <div className={stylesImp.titleInput}>
        <label>Заголовок отчета:</label>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />
      </div>

      {/* Ввод комментария для первого графика */}
      <div className={stylesImp.commentInput}>
        <label>Комментарий к первому графику:</label>
        <textarea
          value={comment1}
          onChange={(e) => setComment1(e.target.value)}
          rows={3}
        />
      </div>

      {/* Столбчатая диаграмма */}
      <div className={stylesImp.chartContainer}>
        <div ref={barRef} className={stylesImp.chart}>
          {ratingBar && (
            <ResponsiveBar
              data={ratingBar.data}
              keys={ratingBar.keys}
              indexBy="criteria"
              margin={{ top: 50, right: 200, bottom: 170, left: 50 }}
              padding={0.3}
              colors={{ scheme: "accent" }}
              legends={[
                {
                  dataFrom: 'keys', anchor: 'bottom-right', direction: 'column', justify: false,
                  translateX: -230, translateY: 120, itemsSpacing: 2, itemWidth: 100,
                  itemHeight: 20, itemDirection: 'left-to-right', itemOpacity: 0.85, symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
              theme={{
                text: { fontSize: 16, fill: '#333', fontFamily: 'Arial, sans-serif', },
                axis: {
                  ticks: { text: { fontSize: 12, fill: '#333', }, },
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Ввод комментария для второго графика */}
      <div className={stylesImp.commentInput}>
        <label>Комментарий ко второму графику:</label>
        <textarea
          value={comment2}
          onChange={(e) => setComment2(e.target.value)}
          rows={3}
        />
      </div>

      {/* Радарный график */}
      <div className={stylesImp.chartContainer}>
        <div ref={radarRef} className={stylesImp.chart}>
          {ratingRadar && (
            <ResponsiveRadar
              data={ratingRadar.data}
              keys={ratingRadar.keys}
              indexBy="criteria"
              maxValue="auto"
              margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              colors={{ scheme: "accent" }}
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: 0,
                  translateY: 0,
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 12,
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
              theme={{
                text: { fontSize: 16, fill: '#333', fontFamily: 'Arial, sans-serif', },
                axis: {
                  ticks: {
                    text: {
                      fontSize: 16,
                      fill: '#333',
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      {/* Кнопка для захвата графиков */}
      <Button sx={{ margin: "20px 0px" }} size="medium" variant="contained" className={stylesImp.button} onClick={captureCharts} startIcon={<StackedBarChart />}>
        Сохранить графики в PDF
      </Button>
      {/* Предпросмотр PDF */}
      {(barImage || radarImage) && 
        <ReportPdfView barImage={barImage} radarImage={radarImage} ratingBar={ratingBar} comment1={comment1} comment2={comment2} title={title}/>
      }
    </div>
  );
};