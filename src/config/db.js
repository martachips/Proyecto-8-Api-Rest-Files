const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Está conectado a la Base de Datos');
  } catch (error) {
    console.log('No está conectado a la Base de Datos');
  }
};

module.exports = { connectDB };
