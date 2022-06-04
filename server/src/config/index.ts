import { config } from "dotenv";

const { parsed } = config();

interface Env
{
  BASE_URL: string;
  PORT: string;
  URL: string;
  MODE: string;
  IN_PROD: string;
  URI: string;
  URI_LOCALE: string;
  SECRET: string;
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
} = parsed as unknown as Env;
