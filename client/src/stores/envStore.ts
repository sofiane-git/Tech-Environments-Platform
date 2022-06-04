import { defineStore } from "pinia";

const useEnvStore = defineStore({
  id: "envStore",
  state: () => ({
    envList: [],
  }),
  // state: {
  //   envTest: newEnv
  // },
  // mutations: {
  //   setEnvTest(state, name) {
  //     state.envTest.value = name
  //   }
  // },
  // actions: {

  // },
  // getters: {
  //   getEnvTest(state) {
  //     return state.envTest
  //   }
  // }
});

export default useEnvStore;
