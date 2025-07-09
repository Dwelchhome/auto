import React, { useState } from "react";
import Odometer from "./OOD";
import TripsPage from "./TripsPage";
import { Tabs, Tab, Box, Snackbar, Alert } from "@mui/material";

function MainWindow() {
  const [tab, setTab] = useState(0);
  const [trips, setTrips] = useState([]);
  const [notif, setNotif] = useState({ open: false, message: "" });

  const addTrip = (trip) => {
    setTrips((prev) => [...prev, trip]);
    setNotif({ open: true, message: `Trip "${trip.name}" added!` });
  };

  const handleNotifClose = () => setNotif({ ...notif, open: false });

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
            <Odometer addTrip={addTrip} />
          </>
        )}
        {tab === 1 && (
          <>
            <h2>Trip Name</h2>
            <TripsPage trips={trips} />
          </>
        )}
      </Box>
      <Snackbar open={notif.open} autoHideDuration={3000} onClose={handleNotifClose}>
        <Alert onClose={handleNotifClose} severity="success" sx={{ width: '100%' }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MainWindow;
// This is the main window component for the application.

