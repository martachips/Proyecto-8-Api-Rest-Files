const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    year: { type: Number },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ['adventures', 'battle', 'terror', 'races', 'sports', 'platform']
    }
  },
  {
    timestamps: true,
    collection: 'games'
  }
);

const Game = mongoose.model('games', gameSchema, 'games');
module.exports = Game;
