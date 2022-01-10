import { Request, Response } from "express";
import express from "express";
import userRoute from "./userRoute";
import productRoute from "./productRoute";

var router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send({
    message: "You are at the root directory",
    routes: ["/api/product", "/api/user"],
  });
});

function activateRoutes() {
  userRoute(router);
  productRoute(router);
}

activateRoutes();

export default router;
