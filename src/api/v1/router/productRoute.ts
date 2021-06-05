import { Router } from "express";
import { getProducts } from "../controller";

async function productRoute(router: Router) {
  router.get("/product", getProducts);
}

export default productRoute;
