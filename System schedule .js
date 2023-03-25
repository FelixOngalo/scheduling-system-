// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/schedule', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
  date: String,
  startTime: String,
  endTime: String,
  description: String
});

// Create the appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Create the express app
const app = express();

// Configure the app to use bodyParser for JSON data
app.use(bodyParser.json());

// Define the route to create a new appointment
app.post('/appointments', async (req, res) => {
  const appointment = new Appointment({
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    description: req.body.description
  });

  try {
    await appointment.save();
    res.send('Appointment scheduled successfully.');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
