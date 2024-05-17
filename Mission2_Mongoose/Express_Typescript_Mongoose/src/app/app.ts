import express, { Response, Request, NextFunction } from "express";
const app = express();

app.use(express.json());
app.use(express.text());
const userRouter = express.Router();

app.use("/users", userRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const userData = req.body;
  console.log(userData);
  res.json({ success: true, userData });
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(something);
  } catch (error) {
    next(error);
  }
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json("Hello there");
});

app.use(
  (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error) {
      res.status(400).json({ message: false, error });
    }
  }
);

app.all("*",(req,res)=>{
  res.status(404).json({success:false,message:`Route Is Not Found ${req.url}`})
})

export default app;
