require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const seq = require('./config/db');
const models = require('./models');

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const offerRoutes = require('./routes/offers');
const feedbackRoutes = require('./routes/feedbacks');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/feedbacks', feedbackRoutes);

app.get('/health', (req,res) => res.json({status:'ok'}));

(async () => {
  try {
    await seq.authenticate();
    console.log('DB connected');
    await seq.sync({ alter:true });
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
