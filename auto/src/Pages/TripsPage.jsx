import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", time: "", gas: "" });

  const handleOpenDialog = (index = null) => {
    setEditIndex(index);
    if (index !== null) {
      setForm(trips[index]);
    } else {
      setForm({ name: "", time: "", gas: "" });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditIndex(null);
    setForm({ name: "", time: "", gas: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...trips];
      updated[editIndex] = form;
      setTrips(updated);
    } else {
      setTrips([...trips, form]);
    }
    handleCloseDialog();
  };

  const handleDelete = (index) => {
    setTrips(trips.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Trips</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 2 }}
      >
        Add Trip
      </Button>
      <List>
        {trips.length === 0 && (
          <ListItem>
            <ListItemText primary="No trips saved." />
          </ListItem>
        )}
        {trips.map((trip, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={trip.name ? `${trip.name} (${trip.time})` : `Time: ${trip.time}`}
              secondary={`Gas Used: ${trip.gas}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpenDialog(idx)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(idx)} sx={{ ml: 1 }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editIndex !== null ? "Edit Trip" : "Add Trip"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 300 }}>
          <TextField
            label="Trip Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Morning Commute"
            fullWidth
          />
          <TextField
            label="Time (mm:ss)"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="e.g. 12:34"
            fullWidth
          />
          <TextField
            label="Gas Used"
            name="gas"
            value={form.gas}
            onChange={handleChange}
            type="number"
            inputProps={{ min: 0, step: "any" }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={!form.name || !form.time || !form.gas}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripsPage;
