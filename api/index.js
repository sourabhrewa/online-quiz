const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const resultRoutes = require('./routes/resultRoutes');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Static frontend folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/result', resultRoutes);
// test route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports= (req,res)=>  app(req,res)