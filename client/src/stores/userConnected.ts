import { defineStore } from "pinia";

interface authInfo {
  message: string;
  success: boolean;
}
interface User {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isAuth: boolean;
  isInit: boolean;
  authInfo?: authInfo;
}

const userConnected = defineStore({
  id: "userConnected",

  state: () => ({
    user: {} as unknown as User,
  }),
  getters: {
    getUser: (state) => state.user,
    getEmail: (state) => state.user["email"],
    getFirstName: (state) => state.user["firstName"],
    getLastName: (state) => state.user["lastName"],
    getFullName: (state) => state.user["fullName"],
    isAuth: (state) => state.user["isAuth"],
    isInit: (state) => state.user["isInit"],
    getAuthInfo: (state) => state.user.authInfo,
  },

  actions: {
    setUserConnected(userEmail: User["email"]) {
      const firstName = userEmail.split("@")[0].split(".")[1];
      const lastName = userEmail.split("@")[0].split(".")[0];

      const firstNameCapitalize = firstName.replace(
        firstName.split("")[0],
        firstName.split("")[0].toUpperCase()
      );

      const lastNameCapitalize = lastName.replace(
        lastName.split("")[0],
        lastName.split("")[0].toUpperCase()
      );

      this.user.email = userEmail;
      this.user.firstName = firstNameCapitalize;
      this.user.lastName = lastNameCapitalize;
      this.user.fullName = `${lastNameCapitalize} ${firstNameCapitalize}`;
      this.user.isAuth = false;
      this.user.isInit = false;
    },
    setAuthInfo(authInfo: authInfo) {
      this.user.authInfo = { ...authInfo };
    },
    resetUserConnected() {
      this.user = {
        email: "",
        firstName: "",
        lastName: "",
        fullName: "",
        isAuth: false,
        isInit: false,
        authInfo: {
          message: "",
          success: false,
        },
      };
    },
    handleIsAuth(bool: boolean) {
      this.user.isAuth = bool;
    },
    handleIsInit(bool: boolean) {
      this.user.isInit = bool;
    },
  },
});

export default userConnected;
