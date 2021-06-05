import express from "express";
import router from "./api/router";

const app = express();

const PORT = process.env.PORT || 8000;

const listening = (): void => {
  console.log(`Listening on port: `, PORT);
};
app.use("/", express.static("public"));

app.use("/api", router);

app.listen(PORT, listening);
