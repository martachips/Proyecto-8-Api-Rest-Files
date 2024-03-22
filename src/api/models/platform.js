const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    games: [{ type: mongoose.Types.ObjectId, ref: 'games' }]
  },
  {
    timestamps: true,
    collection: 'platforms'
  }
);

const Platform = mongoose.model('platforms', platformSchema, 'platforms');
module.exports = Platform;
