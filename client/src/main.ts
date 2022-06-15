import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import gAuthPlugin from "vue3-google-oauth2";
import config from "./config";

const gAuthOptions = {
  clientId: config.VITE_GOOGLE_CLIENT_ID,
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

const pinia = createPinia();
const installPersistedStatePlugin = createPersistedStatePlugin();
pinia.use((context) => installPersistedStatePlugin(context));

app.use(pinia);
app.use(router);
app.use(gAuthPlugin, gAuthOptions);

app.mount("#app");
