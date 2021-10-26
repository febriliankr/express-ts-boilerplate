import { Request, Response } from "express";
import { User } from "../interface";

function getUsers(req: Request, res: Response) {
  const users: User[] = [
    {
      username: "febs",
      email: "febs@mail.com",
    },
    {
      username: "nico",
      email: "nico@gmail.com",
    },
  ];

  res.status(200);
  res.json({
    success: true,
    users,
  });
}

export default getUsers;
