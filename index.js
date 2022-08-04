import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
