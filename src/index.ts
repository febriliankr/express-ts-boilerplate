import express from "express";
import router from "./api/v1/router";

const app = express();

const PORT = process.env.PORT || 8000;

const listening = (): void => {
  console.log(`Listening on port: `, PORT);
};
app.get("/", express.static("public"));

app.use("/api/v1", router);

app.listen(PORT, listening);
