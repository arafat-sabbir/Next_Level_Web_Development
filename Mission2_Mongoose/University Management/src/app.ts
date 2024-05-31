import express, { Application, Request, Response, text } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import allRoutes from './app/routes/index';

app.use(express.json());
app.use(cors());
// use All The Routes From Routes
app.use('/api/v1', allRoutes);
const test = (req: Request, res: Response) => {
  res.send('Hello NewBie!');
};

app.get('/', test);



app.use(globalErrorHandler);

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});

export default app;
