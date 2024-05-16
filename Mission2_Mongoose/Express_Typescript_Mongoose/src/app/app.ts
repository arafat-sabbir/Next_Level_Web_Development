import express, { Response, Request } from "express";
const app = express();

app.use(express.json());
app.use(express.text())


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json("Hello there")
});

export default app;
