import { defineStore } from "pinia";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
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
    },
    resetUserConnected() {
      this.user = { email: "", firstName: "", lastName: "", fullName: "" };
    },
  },
});

export default userConnected;
