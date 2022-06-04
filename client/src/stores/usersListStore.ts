import { defineStore } from "pinia";

interface User {
  email: string;
  createdAt: string;
}

const usersListStore = defineStore({
  id: "usersListStore",

  state: () => ({
    users: [] as unknown as User[],
  }),
  getters: {
    getUsersListDetails: (state) => state.users,
    getUsersEmail: (state) => state.users.map((user) => user.email),
    getUsersCreation: (state) => state.users.map((user) => user.createdAt),
    // getUsersFullName: (state) => state.users.map((user) => user.fullName),
  },

  actions: {
    refreshUsersList(users: User[]) {
      this.users = [...users];
    },
  },
});

export default usersListStore;
