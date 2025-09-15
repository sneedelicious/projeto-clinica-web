const Appointment = require('../models/Appointment');
const axios = require('axios');

exports.createAppointment = async (req, res) => {
  const { date, description, zipCode } = req.body;
  const patient = req.user.id;

  try {
    const addressRes = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
    const { logradouro, localidade, uf } = addressRes.data;

    const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${localidade},BR&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`);
    const { main, weather } = weatherRes.data;

    const newAppointment = new Appointment({
      patient,
      date,
      description,
      address: { street: logradouro, city: localidade, state: uf, zipCode },
      weather: { description: weather[0].description, temperature: main.temp }
    });

    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("### ERRO AO CRIAR AGENDAMENTO ###", err); 
    res.status(500).json({ error: 'Erro ao criar agendamento.', details: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    if (req.user.role === 'secretary') {
      const appointments = await Appointment.find().populate('patient', 'name');
      res.json(appointments);
    } else {
      const appointments = await Appointment.find({ patient: req.user.id });
      res.json(appointments);
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};