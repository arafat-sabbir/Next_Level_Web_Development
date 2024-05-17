import express, { Response, Request } from "express";
const app = express();

app.use(express.json());
app.use(express.text());
const userRouter = express.Router();



app.use("/users",userRouter)



userRouter.post("/create-user",(req:Request,res:Response)=>{
  const userData = req.body;
  console.log(userData);
  res.json({success:true,userData})
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json("Hello there");
});

export default app;
