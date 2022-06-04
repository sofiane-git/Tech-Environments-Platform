import { createRouter, createWebHistory } from "vue-router";
import AllEnvTest from "../views/AllEnvTest.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/*",
      name: "404",
      redirect: "/",
    },

    {
      path: "/platform",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      beforeEnter: (to, from, next) => {
        const userStorage = JSON.parse(localStorage.userConnected).user;
        if (userStorage.email === "") {
          router.push("/");
        }
        next();
      },
      component: () => import("../views/AllEnvTest.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(`Navigation venant de ${from.path} vers ${to.path}`);
  next();
});
export default router;
