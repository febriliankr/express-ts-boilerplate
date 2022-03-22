import { Request, Response } from "express";
import { verifyJWT } from "../config/jwt";

function getUsers(req: Request, res: Response) {
  const userData = verifyJWT(req.headers.authorization);

  res.status(200);
  res.json({
    success: true,
    data: userData,
  });
}

export default getUsers;
