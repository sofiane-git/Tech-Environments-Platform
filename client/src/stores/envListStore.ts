import { defineStore } from "pinia";
import type { Env } from "../interfaces/Env";

const envListStore = defineStore({
  id: "envListStore",

  state: () => ({
    env: [] as unknown as Env[],
  }),
  getters: {
    getEnvListDetails: (state) => state.env,
  },

  actions: {
    refreshEnvList(env: Env[]) {
      this.env = [...env];
    },
  },
});

export default envListStore;
