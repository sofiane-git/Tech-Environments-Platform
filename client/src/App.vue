<template>
  <div class="h-screen w-full">
    <div class="sm:w-4/5 md:w-3/4 lg:w-3/5 h-full mx-auto">
      <header
        class="flex justify-center items-center py-4 border-b border-black relative z-10"
      >
        <h1 class="text-2xl grow text-center pl-11">
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
        await Vue3GoogleOauth.instance.signOut();
      }
      useUserConnected.handleIsAuth(true);
    } else {
      useUserConnected.handleIsAuth(false);
    }
  } else {
    useUserConnected.handleIsInit(false);
  }
});
</script>
