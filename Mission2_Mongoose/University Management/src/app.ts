import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

// routes

app.use(express.json());
app.use(cors());
// use routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NewBie!');
});

app.use(globalErrorHandler);

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});

export default app;
