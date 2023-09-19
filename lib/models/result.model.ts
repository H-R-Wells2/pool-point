const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  players: [
    {
      playerName: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

module.exports = Result;
