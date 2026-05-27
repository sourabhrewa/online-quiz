const express = require('express');
const Test = require('../models/Test');

const router = express.Router();


// CREATE TEST
router.post('/create-test', async (req, res) => {

  try {

    const test = new Test(req.body);

    await test.save();

    res.status(201).json({
      message: 'Test created successfully',
      test
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

// GET ALL TESTS
router.get('/all-tests', async (req, res) => {

  try {

    const tests = await Test.find();

    res.status(200).json(tests);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
// GET SINGLE TEST
router.get('/:id', async (req, res) => {

  try {

    const test = await Test.findById(req.params.id);

    res.status(200).json(test);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});
module.exports = router;