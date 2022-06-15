import { config } from "dotenv";

const { parsed } = config();

interface Config
{
  BASE_URL: string;
  PORT: string;
  URL: string;
  MODE: string;
  IN_PROD: string;
  URI: string;
  URI_LOCALE: string;
  SECRET: string;
  GOOGLE_CLIENT_ID: string;
  SLACK_WEBHOOK_URL: string;
}
export const {
  BASE_URL,
  PORT,
  URL = `${BASE_URL}${PORT}`,
  MODE,
  IN_PROD = MODE !== "production",
  URI,
  URI_LOCALE,
  SECRET,
  GOOGLE_CLIENT_ID,
  SLACK_WEBHOOK_URL
} = parsed as unknown as Config;
