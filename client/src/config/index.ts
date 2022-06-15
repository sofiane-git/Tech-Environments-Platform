interface Config {
  BASE_URL: string;
  VITE_GOOGLE_CLIENT_ID: string;
  VITE_SLACK_WEBHOOK_URL: string;
  VITE_SLACK_CHANNEL_PLATFORM: string;
}
const config: Config = {
  BASE_URL: import.meta.env.BASE_URL,
  VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  VITE_SLACK_WEBHOOK_URL: import.meta.env.VITE_SLACK_WEBHOOK_URL,
  VITE_SLACK_CHANNEL_PLATFORM: import.meta.env.VITE_SLACK_CHANNEL_PLATFORM,
};

export default config;
