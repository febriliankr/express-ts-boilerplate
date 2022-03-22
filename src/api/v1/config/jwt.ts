import jwt from "jsonwebtoken";
import { User } from "../interface";

require("dotenv").config();
const jwtPrivateKey = process.env.jwtPrivateKey || "";

function signJWT(payload: object): string {
  return jwt.sign(payload, jwtPrivateKey, {
    expiresIn: "28d",
    algorithm: "HS256",
  });
}

function verifyJWT(token: string | undefined): string | jwt.JwtPayload | User {
  return jwt.verify(token || "", jwtPrivateKey, {
    algorithms: ["HS256"],
  });
}

// example: const userData = verifyJWT(req.headers.authorization);

export { signJWT, verifyJWT };
