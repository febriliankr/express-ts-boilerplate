import getUsers from "../controller/userController";
import express from "express";

var router = express.Router();

const userRoute = router.get("/user", getUsers);

export default userRoute;
