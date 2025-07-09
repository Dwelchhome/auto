import React, { useState } from "react";
import Odometer from "./OOD";
import TripsPage from "./TripsPage";
import { Tabs, Tab, Box } from "@mui/material";

function MainWindow() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Odometer" />
        <Tab label="Trips" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <>
            <h1>This is the Main Window</h1>
            <Odometer />
          </>
        )}
        {tab === 1 && <TripsPage />}
      </Box>
    </Box>
  );
}

export default MainWindow;
// This is the main window component for the application.

