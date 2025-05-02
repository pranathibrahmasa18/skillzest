const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import MySQL connection (optional, if you need MySQL somewhere)
const mysqlConnection = require('./db');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require("./routes/courses");

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/learnfromIITians', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);
app.use('/courses', courseRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
