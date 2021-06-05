import { Request, Response } from "express";
import { Product } from "../interace";

function getProducts(req: Request, res: Response) {

  console.log(`reqProduct`, req)
  const products: Product[] = [
    {
      sku: "A1",
      title: "LV Purse",
      price: 100000,
    },
    {
      sku: "A2",
      title: "Gucci Bag",
      price: 200000,
    },
  ];

  res.status(200);
  res.json({
    success: true,
    products,
  });
}

export default getProducts;
