import { defineStore } from "pinia";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isAuth: boolean;
  isInit: boolean;
}

const userConnected = defineStore({
  id: "userConnected",

  state: () => ({
    user: {} as unknown as User,
  }),
  getters: {
    getUserConnected: (state) => state.user,
    getUserConnectedEmail: (state) => state.user["email"],
    getUserConnectedFirstName: (state) => state.user["firstName"],
    getUserConnectedLastName: (state) => state.user["lastName"],
    getUserConnectedFullName: (state) => state.user["fullName"],
    getUserConnectedIsAuth: (state) => state.user["isAuth"],
    getUserConnectedIsInit: (state) => state.user["isInit"],
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
    resetUserConnected() {
      this.user = {
        email: "",
        firstName: "",
        lastName: "",
        fullName: "",
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
});

export default userConnected;
