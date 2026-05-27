const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

  question: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    required: true
  },

  correctAnswer: {
    type: Number,
    required: true
  }

});

const testSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  timeLimit: {
    type: Number,
    required: true
  },

  questions: [questionSchema]

});

module.exports = mongoose.model('Test', testSchema);