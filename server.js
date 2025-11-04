const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas using Environment Variable
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// -------------------- Schemas --------------------
const ReservationSchema = new mongoose.Schema({
  guestName: String,
  roomType: String,
  checkIn: String,
  checkOut: String,
  guestCount: Number,
  status: String,
  email: String,
  phone: String
});

const GuestSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  idType: String,
  idNumber: String,
  roomType: String
});

const RoomSchema = new mongoose.Schema({
  roomNumber: String,
  roomType: String,
  price: Number,
  status: String
});

// -------------------- Models --------------------
const Reservation = mongoose.model('Reservation', ReservationSchema);
const Guest = mongoose.model('Guest', GuestSchema);
const Room = mongoose.model('Room', RoomSchema);

// -------------------- Reservation APIs --------------------
app.post('/api/reservations', async (req, res) => {
  const reservation = new Reservation(req.body);
  await reservation.save();
  res.json(reservation);
});

app.get('/api/reservations', async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

app.delete('/api/reservations/:id', async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// -------------------- Guest APIs --------------------
app.post('/api/guests', async (req, res) => {
  const guest = new Guest(req.body);
  await guest.save();
  res.json(guest);
});

app.get('/api/guests', async (req, res) => {
  const guests = await Guest.find();
  res.json(guests);
});

app.delete('/api/guests/:id', async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// -------------------- Room APIs --------------------
app.post('/api/rooms', async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.json(room);
});

app.get('/api/rooms', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

app.delete('/api/rooms/:id', async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
// Add this to your server.js
app.put('/api/reservations/:id', async (req, res) => {
    const updated = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// -------------------- Server Start --------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
