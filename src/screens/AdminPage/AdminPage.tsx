"use client"
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { TabPanel } from "./TabPanel";
import  CriterionTab  from "./tabs/CriterionTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import DisciplineTab from "./tabs/DisciplineTab";
import StudentTab from "./tabs/StudentTab";
import DocumentTab from "./tabs/DocumentTab";
import DocumentTypeTab from "./tabs/DocumentTypesTab";
import EmployeeTab from "./tabs/EmployeeTab";
import GradeTab from "./tabs/GradeTab";
import GroupTab from "./tabs/GroupTab";
import LessonTab from "./tabs/LessonTab";
import RoleTab from "./tabs/RoleTab";

export const AdminPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userInfo);

  if (!user || user.roleId !== 1) {
    router.push("/home");
    return null;
  }

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "60px" }}>
      <Tabs value={tabValue} onChange={handleChange} centered textColor="primary" indicatorColor="primary">
        <Tab label="Критерии" />
        <Tab label="Дисциплины" />
        <Tab label="Студенты" />
        <Tab label="Документы" />
        <Tab label="Типы документов" />
        <Tab label="Работники" />
        <Tab label="Оценки" />
        <Tab label="Группы" />
        <Tab label="Занятия" />
        <Tab label="Роли" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        <TabPanel value={tabValue} index={0}>
          <CriterionTab />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DisciplineTab />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <StudentTab />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <DocumentTab />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <DocumentTypeTab />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <EmployeeTab />
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          <GradeTab />
        </TabPanel>
        <TabPanel value={tabValue} index={7}>
          <GroupTab />
        </TabPanel>
        <TabPanel value={tabValue} index={8}>
          <LessonTab />
        </TabPanel>
        <TabPanel value={tabValue} index={9}>
          <RoleTab />
        </TabPanel>
      </Box>
    </Box>
  );
};