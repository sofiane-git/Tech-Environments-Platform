import HomeViewVue from "../views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllEnvTest from "../views/AllEnvTest.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter: async (to, from, next) => {
        const userStorage = JSON.parse(localStorage.userConnected).user;
        if (userStorage?.email) {
          router.push({ name: "platform" });
        }
        next();
      },
    },
    {
      path: "/*",
      name: "404",
      redirect: "/",
    },
    {
      path: "/homeview",
      component: HomeViewVue,
    },
    {
      path: "/platform",
      name: "platform",
      component: AllEnvTest,

      beforeEnter: async (to, from, next) => {
        const userStorage = JSON.parse(localStorage.userConnected).user;
        if (!userStorage?.email) {
          router.push({ name: "login" });
        }
        next();
      },
    },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   console.log(`Navigation venant de ${from.path} vers ${to.path}`);
//   next();
// });

export default router;
