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
      // meta: { requiresAuth: false },
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
      // meta: { requiresAuth: true },

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AllEnvTest.vue"),

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

router.beforeEach(async (to, from, next) => {
  console.log(`Navigation venant de ${from.path} vers ${to.path}`);
  next();
});

// router.beforeEach((to, from) => {
//   // instead of having to check every route record with
//   // to.matched.some(record => record.meta.requiresAuth)
//   if (to.meta.requiresAuth && !auth.isLoggedIn()) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     return {
//       path: '/login',
//       // save the location we were at to come back later
//       query: { redirect: to.fullPath },
//     }
//   }
// })
export default router;
