import HomeViewVue from "../views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllEnvTest from "../views/AllEnvTest.vue";
import Login from "../views/Login.vue";
import { inject } from "vue";

// const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      // component:
      //   JSON.parse(localStorage.userConnected).user.email === ""
      //     ? Login
      //     : AllEnvTest,
      component: Login,
      props: true,
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
      props: true,

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      beforeEnter: async (to, from, next) => {
        // if (!Vue3GoogleOauth?.isAuthorized) {
        if (!localStorage.userConnected) {
          router.push({ name: "login" });
        } else {
          const userStorage = JSON.parse(localStorage.userConnected).user;
          if (userStorage.email === "") {
            router.push({ name: "login" });
          }
          // }
        }
        next();
      },
      // component: () => import("../views/AllEnvTest.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log(`Navigation venant de ${from.path} vers ${to.path}`);
  next();
});
export default router;
