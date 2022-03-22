import dotenv from "dotenv";
dotenv.config();

export const googleAuthRedirectUri =
  process.env.SERVER_URI + "/google-callback-uri";
