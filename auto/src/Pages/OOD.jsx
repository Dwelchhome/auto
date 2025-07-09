import React, { useState } from "react";
import { Box, Button, TextField, Typography, Stack, Dialog, DialogTitle, DialogContent } from "@mui/material";
import Trip from "./Trip"; // Import the Trip component

const Odometer = ({ addTrip }) => {
  const [savedValue, setSavedValue] = useState("000000");
  const [editValue, setEditValue] = useState("000000");
  const [tripName, setTripName] = useState("");
  const [openTrip, setOpenTrip] = useState(false); // State for modal

  const formatValue = (val) => val.replace(/\D/g, "").slice(0, 6).padStart(6, "0");

  const adjustValue = (delta, e) => {
    const num = Number(editValue) || 0;
    const step = e && e.ctrlKey ? 10 : 1;
    let newValue = num + delta * step;
    newValue = Math.max(0, Math.min(newValue, 999999));
    setEditValue(newValue.toString().padStart(6, "0"));
  };

  const handleSave = () => {
    const sum = Math.min((Number(savedValue) || 0) + (Number(editValue) || 0), 999999);
    setSavedValue(sum.toString().padStart(6, "0"));
    if (tripName.trim()) {
      addTrip({ name: tripName.trim(), miles: editValue });
    }
    setEditValue("000000");
    setTripName("");
  };

  const handleStartTrip = () => {
    setOpenTrip(true); // Open the Trip modal
  };

  const handleCloseTrip = () => {
    setOpenTrip(false); // Close the Trip modal
  };

  return (
    <Box sx={{ fontFamily: "monospace", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Odometer (Mileage Tracker)</Typography>
      <Box sx={{
        fontSize: "2.5rem", letterSpacing: "0.3rem", background: "#222", color: "#0f0",
        p: "1rem 2rem", borderRadius: 2, display: "inline-block", mb: 2,
      }}>
        {savedValue}
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
        <TextField
          label="Trip Name"
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          inputProps={{
            maxLength: 32,
            style: { fontSize: "1rem", width: "10ch" },
          }}
          placeholder="Trip"
          size="small"
          sx={{ mr: 1 }}
        />
        <TextField
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(formatValue(e.target.value))}
          inputProps={{
            maxLength: 6,
            style: { fontSize: "1.2rem", textAlign: "center", width: "8ch", letterSpacing: "0.2ch" },
          }}
          placeholder="Miles to add"
          size="small"
        />
        <Button variant="outlined" onClick={(e) => adjustValue(-1, e)} title="Click: -1, Ctrl+Click: -10">-</Button>
        <Button variant="outlined" onClick={(e) => adjustValue(1, e)} title="Click: +1, Ctrl+Click: +10">+</Button>
        <Button variant="contained" onClick={handleSave}>Add</Button>
        <Button variant="outlined" color="secondary" onClick={handleStartTrip} sx={{ ml: 1 }}>
          Start Trip
        </Button>
      </Stack>
      <Typography sx={{ mt: 2, color: "#888", fontSize: "0.95rem" }} component="div">
        Enter the miles you want to add, then click <b>Add</b>.<br />
        Use <b>+</b> or <b>-</b> to adjust, hold <b>Ctrl</b> for steps of 10.
      </Typography>

      {/* Trip Modal */}
      <Dialog open={openTrip} onClose={handleCloseTrip} maxWidth="xs" fullWidth>
        <DialogTitle>Start Trip</DialogTitle>
        <DialogContent>
          <Trip />
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button onClick={handleCloseTrip} color="secondary">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Odometer;