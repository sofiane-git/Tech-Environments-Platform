import { config } from "dotenv";

const { parsed } = config();

interface Config
{
  BASE_URL: string;
  PORT: string;
  URL: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
  SLACK_WEBHOOK_URL: string;
}
export const {
  BASE_URL,
  PORT,
  URL = `${BASE_URL}:${PORT}`,
  NODE_ENV,
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  SLACK_WEBHOOK_URL
} = parsed as unknown as Config;
