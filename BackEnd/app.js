const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./Routes/CustomerAuthRoutes');
const authMiddleware = require('./Middleware/CustomerAuthMiddleware');
const vehicleRoutes = require('./Routes/vehicleRoutes');
const driverRatingRouter = require("./Routes/driverRatingRouter");
const reportRoutes = require('./Routes/reportRoutes');
const recruiterReportRoutes = require('./Routes/renterReportRoutes');
const bookingRoutes = require("./Routes/bookingRoutes");
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use("/api", bookingRoutes);
app.use("/api", driverRatingRouter); 
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/vehicles', vehicleRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
app.use('/api', reportRoutes);
app.use('/api/renter', recruiterReportRoutes);

// ✅ Don't include chat/socket code here

module.exports = app;
