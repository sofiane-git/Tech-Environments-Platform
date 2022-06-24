import type { UserConnected, AuthInfo, User } from "../interfaces/User";
import { defineStore } from "pinia";

const userConnected = defineStore({
  id: "userConnected",

  state: () => ({
    user: {} as unknown as UserConnected,
  }),
  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.user["email"],
    getFullName: (state) => state.user["fullName"],
    isAuth: (state) => state.user["isAuth"],
    isInit: (state) => state.user["isInit"],
    getAuthInfo: (state) => state.user.authInfo,
  },

  actions: {
    setUserConnected(user: User) {
      const firstName = user.email?.split("@")[0].split(".")[1];
      const lastName = user.email?.split("@")[0].split(".")[0];

      const firstNameCapitalize = firstName?.replace(
        firstName.split("")[0],
        firstName.split("")[0].toUpperCase()
      );

      const lastNameCapitalize = lastName?.replace(
        lastName.split("")[0],
        lastName.split("")[0].toUpperCase()
      );

      this.user.email = user.email;
      this.user.fullName = `${lastNameCapitalize} ${firstNameCapitalize}`;
      this.user.isAuth = false;
      this.user.isInit = false;
      this.user.role = user.roles;
    },
    setAuthInfo(authInfo: AuthInfo) {
      this.user.authInfo = { ...authInfo };
    },
    resetUserConnected() {
      this.user = {
        isAuth: false,
        isInit: false,
      };
    },
    handleIsAuth(bool: boolean) {
      this.user.isAuth = bool;
    },
    handleIsInit(bool: boolean) {
      this.user.isInit = bool;
    },
  },
  // persistedState: {
  //   includePaths: ["user.isAuth", "user.isInit", "user.email"],
  // },
});

export default userConnected;
