import { Request, Response } from "express";
import express from "express";
import { createUser, getUsers } from "./user";

var router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send({
    message: "You are at the root directory",
    routes: ["/user"],
  });
});

router.get("/user", getUsers);
router.post("/user", createUser);



export default router;
