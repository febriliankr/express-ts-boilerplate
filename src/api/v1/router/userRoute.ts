import getUsers from "../controller/userController";
import { Router } from "express";

async function userRoute(router: Router) {
  router.get("/user/verify-token", getUsers);
  router.get("/user", getUsers);
}

export default userRoute;
