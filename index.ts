import express, { NextFunction, Request, Response } from "express";

const app = express();

const port = process.env.PORT || 5000;

app.use((req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to Express");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
