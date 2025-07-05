import { nivoDiagramm } from "@/components/RatingsWithArray/RatingsWithArray"
import { ResponsiveBar } from "@nivo/bar"
import { FC } from "react";
import { nivoTheme } from "../generalTheme";

interface BarContainerProps {
  rating: nivoDiagramm;
}

export const BarContainer: FC<BarContainerProps> = ({ rating }) => {
  return (
    <ResponsiveBar
      data={rating.data}
      keys={rating.keys}
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
      theme={nivoTheme}
    />
  )
}