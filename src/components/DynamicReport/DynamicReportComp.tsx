'use client'
// components/DynamicReportComp.tsx
import dynamic from 'next/dynamic';

export const DynamicReportComp = dynamic(() => import("@/screens/ReportPage/ReportPage"), {
  ssr: false,
  loading: () => <p>Загрузка отчёта...</p>,
});