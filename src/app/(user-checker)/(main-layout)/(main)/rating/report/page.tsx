import { DynamicReportComp } from "@/components/DynamicReport/DynamicReportComp"
import ReportComp from "@/screens/ReportPage/ReportPage"
import { Suspense } from "react"

export default function Report() {
  return (
    <Suspense fallback="Загрузка...">
      {/* <ReportComp /> */}
      <DynamicReportComp/>
    </Suspense>
    )
}