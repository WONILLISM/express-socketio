import express, { Express, Request, Response } from "express";

const app: Express = express();

const PORT = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello!!");
});

app.listen(`${PORT}`, () => {
  console.log(`
  ################################################
       🛡️  Server listening on port: ${PORT}🛡️
  ################################################
  
  `);
});
