import {
  getAccessTokenFromCode,
  getGoogleUserInfo,
  urlGoogle,
} from "../config/googleAuth/googleLogin";

import { Request, Response } from "express";
import db from "../config/postgres";
import { signJWT } from "../config/jwt";
import { clientUrl } from "../config/client";

function getGoogleAuthUrl(req: Request, res: Response) {
  const url = urlGoogle();
  res.status(200);
  res.redirect(url);
}

async function googleLoginCallback(req: Request, res: Response) {
  const { code } = req.query;
  const token = await getAccessTokenFromCode(code as string);
  const user = await getGoogleUserInfo(token.access_token);

  // check if user exists
  const queryUser = `SELECT * FROM users WHERE email = $1`;
  const { rows: userRows } = await db.query(queryUser, [user.email]);
  let jwt: string = signJWT({ ...userRows[0], isNewUser: false });

  if (userRows.length > 0) {
    res.redirect(clientUrl + "/login/accept-token?token=" + jwt);
    return;
  }

  const query = `INSERT INTO users (name, email, picture_url)
  VALUES ($1, $2, $3) RETURNING *`;

  const values = [user.name, user.email, user.picture];
  const { rows } = await db.query(query, values);

  jwt = signJWT({ ...rows[0], isNewUser: true });

  res.redirect(clientUrl + "/login/accept-token?token=" + jwt);
}

export { getGoogleAuthUrl, googleLoginCallback };
