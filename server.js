const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/train', require('./routes/trainRoutes'));
app.use('/booking', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));