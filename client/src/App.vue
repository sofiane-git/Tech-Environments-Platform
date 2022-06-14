<template>
  <!-- <Suspense>
    <template #fallback>Loading...</template>
    <template #default> -->
  <div class="h-screen w-full dark:bg-neutral-900">
    <div class="sm:w-4/5 md:w-3/4 lg:w-3/5 h-full mx-auto">
      <header
        class="flex justify-center items-center py-4 border-b border-black dark:border-white relative z-10"
      >
        <h1 class="text-2xl dark:text-white grow text-center">
          Utilisation des environnements de test
        </h1>
        <profil-menu />
      </header>

      <main class="w-full h-4/5 flex items-center justify-center">
        <div
          class="w-4/5 h-3/4 shadow shadow-white rounded p-4 bg-white relative"
        >
          <router-view />
        </div>
      </main>
    </div>
  </div>
  <!-- </template> -->
  <!-- </Suspense> -->
</template>

<script lang="ts" setup>
import { inject, watchEffect } from "vue";
import { ProfilMenu } from "./components/organisms";
import userConnected from "./stores/userConnected";

const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");
const useUserConnected = userConnected();
const userStorage =
  localStorage.userConnected && JSON.parse(localStorage.userConnected).user;

watchEffect(async () => {
  if (Vue3GoogleOauth.isInit) {
    useUserConnected.handleIsInit(true);

    if (Vue3GoogleOauth.isAuthorized) {
      if (!userStorage.email) {
        console.log("signout");

        await Vue3GoogleOauth.instance.signOut();
      }
      useUserConnected.handleIsAuth(true);
      // console.log("auth", useUserConnected.isAuth);
    } else {
      useUserConnected.handleIsAuth(false);
    }
  } else {
    useUserConnected.handleIsInit(false);
  }
});
</script>
