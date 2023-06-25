import express from "express";
import router from "./api/routes";
import bodyParser from 'body-parser'

const app = express();

const PORT = process.env.PORT || 8000;

const listening = (): void => {
  console.log(`Listening on port: `, PORT);
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/", router);

app.listen(PORT, listening);
