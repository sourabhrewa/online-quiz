const express = require('express');

const router = express.Router();

const Result = require('../models/Result');


// SAVE RESULT
router.post('/save', async (req, res) => {

  try {

    const result = await Result.create(req.body);

    res.status(201).json(result);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// GET ALL RESULTS
router.get('/all', async (req, res) => {

  try {

    const results = await Result.find();

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;