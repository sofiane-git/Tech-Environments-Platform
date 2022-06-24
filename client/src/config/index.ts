interface Config {
  GOOGLE_CLIENT_ID: string;
  SLACK_CHANNEL_PLATFORM: string;
  BASE_URL: string;
  PORT_SERVER: number;
}
const config: Config = {
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  SLACK_CHANNEL_PLATFORM: import.meta.env.VITE_SLACK_CHANNEL_PLATFORM,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  PORT_SERVER: import.meta.env.VITE_PORT_SERVER,
};

export default config;
