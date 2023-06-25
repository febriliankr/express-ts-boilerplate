import { Request } from "express";

export function createUser(req, res) {
  const userData = req.body

  res.status(200);
  res.json({
    success: true,
    data: userData,
    body: req.body,
  });
}

export function getUsers(req: Request, res) {

  res.status(200);
  res.json({
    success: true,
    urlQueryParams: req.query,
    data: "user returned!",
  });
}
