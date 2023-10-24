import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import driverRoutes from './routes/driverRoutes';
import loadDemoData from './demoData';

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://admin:password@mongo:27017').then(() => {
    console.log('Connected to MongoDB');
    loadDemoData()
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });
}

app.use('/drivers', driverRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});

module.exports = app;
