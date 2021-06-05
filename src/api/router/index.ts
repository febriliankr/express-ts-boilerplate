import { Request, Response } from "express";
import express from "express";
import getProducts from "../controller/productController";
import getUsers from "../controller/userController";

var router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send({
    message: "You are at the root directory",
    routes: ["/api/product", "/api/user"],
  });
});

router.get("/product", getProducts);
router.get("/user", getUsers);

export default router;
