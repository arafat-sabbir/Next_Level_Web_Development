import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';

// routes

app.use(express.json());
app.use(cors());
// use routes
app.use('/api/v1/student', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NewBie!');
});

export default app;
