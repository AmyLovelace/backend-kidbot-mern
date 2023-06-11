import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import storyRouter from './routes/story.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
connectDB()


app.use(cors()); 
app.use('/users', userRouter);
app.use('/stories', storyRouter);


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
