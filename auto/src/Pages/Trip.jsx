import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

const Trip = () => {
  // Stopwatch state
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Gas used state
  const [showGasInput, setShowGasInput] = useState(false);
  const [gasUsed, setGasUsed] = useState(0);

  // Start/Stop/Reset stopwatch
  const handleStart = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
  };
  const handleStop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };
  const handleReset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  // Format time as mm:ss
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Gas input popup controls
  const handleFillUpClick = () => setShowGasInput(true);
  const handleGasChange = (e) => setGasUsed(Number(e.target.value));
  const handleGasInc = () => setGasUsed((g) => g + 1);
  const handleGasDec = () => setGasUsed((g) => (g > 0 ? g - 1 : 0));
  const handleClosePopup = () => setShowGasInput(false);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h3>Stopwatch</h3>
        <div style={{ fontSize: 32 }}>{formatTime(time)}</div>
        <Button
          variant="contained"
          onClick={handleStart}
          disabled={running}
          sx={{ mr: 1 }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          onClick={handleStop}
          disabled={!running}
          sx={{ mr: 1 }}
        >
          Stop
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Add Trip
        </Button>
        <Button variant="contained" onClick={handleFillUpClick}>
          Fill Up
        </Button>
      </div>
      <Dialog open={showGasInput} onClose={handleClosePopup}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          Enter Gas Used
          <IconButton onClick={handleClosePopup} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <IconButton onClick={handleGasDec} size="large">
              <RemoveIcon />
            </IconButton>
            <TextField
              type="number"
              value={gasUsed}
              onChange={handleGasChange}
              inputProps={{
                min: 0,
                step: "any",
                style: { textAlign: "center", width: 80 },
              }}
              sx={{ mx: 2 }}
            />
            <IconButton onClick={handleGasInc} size="large">
              <AddIcon />
            </IconButton>
          </div>
          <Button variant="contained" onClick={handleClosePopup}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trip;