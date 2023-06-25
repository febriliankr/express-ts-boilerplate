import dotenv from "dotenv";
dotenv.config();

const clientUrl = process.env.CLIENT_URL || "";

export { clientUrl };
