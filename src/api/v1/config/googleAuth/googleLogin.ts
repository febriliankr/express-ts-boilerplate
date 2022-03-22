import axios from "axios";
import { google } from "googleapis";
import { googleAuthRedirectUri } from "../server";

require("dotenv").config();
const google_client_id = process.env.google_client_id;
const google_client_secret = process.env.google_client_secret;

const googleConfig = {
  clientId: google_client_id, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: google_client_secret, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: googleAuthRedirectUri, // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth: any) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
  const auth = createConnection(); // this is from previous step
  const url = getConnectionUrl(auth);
  return url;
}

async function getAccessTokenFromCode(
  code: string
): Promise<GoogleAccessTokenType> {
  const request = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: google_client_id,
      client_secret: google_client_secret,
      redirect_uri: googleAuthRedirectUri,
      grant_type: "authorization_code",
      code,
    },
  });
  const data: GoogleAccessTokenType = request.data;

  return data;
}

interface GoogleAccessTokenType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

async function getGoogleUserInfo(access_token: string) {
  try {
    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { urlGoogle, getAccessTokenFromCode, getGoogleUserInfo };
