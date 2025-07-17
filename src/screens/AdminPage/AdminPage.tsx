"use client"
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { TabPanel } from "./TabPanel";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { configEntity, TabConfig, tabConfigs } from "./config";

export const AdminPage = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [tabValue, setTabValue] = useState(0);

  if (!user || user.roleId !== 1) {
    router.push("/home");
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "60px" }}>
      <Tabs value={tabValue} onChange={handleChange} centered textColor="primary" indicatorColor="primary">
        {tabConfigs.map((config) => {
          return (
            <Tab label={config.label} key={config.index} />
          );
        })}
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tabConfigs.map((tab: configEntity) => {
          const TabComponent = tab.component;
          return (
            <TabPanel key={tab.index} value={tabValue} index={tab.index}>
              <TabComponent {...tab.props} />
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
};