import { nivoDiagramm } from "@/components/RatingsWithArray/RatingsWithArray"
import { ResponsiveRadar } from "@nivo/radar";
import { FC } from "react";
import { nivoTheme } from "../generalTheme";

interface RadarContainerProps {
  rating: nivoDiagramm;
}

export const RadarContainer: FC<RadarContainerProps> = ({ rating }) => {
  return (
    <ResponsiveRadar
      data={rating.data}
      keys={rating.keys}
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
      theme={nivoTheme}
    />
  )
}