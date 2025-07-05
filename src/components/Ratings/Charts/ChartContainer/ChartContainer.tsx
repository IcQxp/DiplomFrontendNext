import React, { FC, forwardRef } from "react";
import styles from "./ChartContainer.module.scss"
import { nivoDiagramm } from "@/components/RatingsWithArray/RatingsWithArray";
import { BarContainer } from "../BarContainer/BarContainer";
import { RadarContainer } from "../RadarContainer/RadarContainer";

export type ChartType = 'bar' | 'radar';

interface ChartContainerProps {
  type: ChartType;
  rating: nivoDiagramm;
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ type, rating }, ref) => {
    return (
      <div className={styles.chart}>
        <div ref={ref} className={styles.chart__container}>
          {rating && (
            type === 'bar' ?
              <BarContainer rating={rating} /> :
              <RadarContainer rating={rating} />
          )}
        </div>
      </div>
    )
  });

ChartContainer.displayName = 'ChartContainer';