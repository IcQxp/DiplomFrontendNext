import { StackedBarChart } from "@mui/icons-material"
import { Button } from "@mui/material"
import { FC } from "react"

interface CaptureButtonProps {
  captureCharts: () => void
}
export const CaptureButton: FC<CaptureButtonProps> = ({ captureCharts }) => {
  return (
    <Button sx={{ margin: "20px 0px" }} size="medium" variant="contained" onClick={captureCharts} startIcon={<StackedBarChart />}>
      Сохранить графики в PDF
    </Button>
  )
}