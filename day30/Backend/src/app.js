import express from 'express';
import authRouter from './routes/auth.routes.js';
import handleError from './middleware/error.middleware.js';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });  // explicitly load env variables from src/.env

const app = express();

app.use(express.json()); // to parse incoming JSON data

app.use('/api/auth', authRouter);



app.use(handleError); // always used at last to handle errors

export default app;