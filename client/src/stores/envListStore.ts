import { defineStore } from "pinia";

interface Env {
  _id: string;
  name: string;
  isFree: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

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
