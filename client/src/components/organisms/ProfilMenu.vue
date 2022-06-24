<template>
  <div>
    <div v-if="!useUserConnected.isInit">
      <icon-loading />
    </div>

    <div v-else>
      <Button
        v-if="useUserConnected.isAuth"
        custom-button-class="relative rounded-none hover:shadow-none border-none active:shadow-none focus:outline-none"
        @focusout="clickOnProfileMenu && (clickOnProfileMenu = false)"
      >
        <Icon
          type="outline"
          title="Profil"
          :d="[{ path: icons.user_circle.outline.path }]"
          custom-class="h-8 w-8 cursor-pointer stroke-1 hover:text-gray-500"
          :class="clickOnProfileMenu ? 'text-gray-300' : 'text-black'"
          @click="handleClickOnProfileMenu()"
        />
        <ul
          v-if="clickOnProfileMenu"
          class="shadow-md border rounded text-black bg-white w-40 absolute top-10 right-[-60px] transition-all"
        >
          <item-menu
            v-for="(item, key) in itemListData"
            :key="key"
            :item-profil="item"
            @click="item.setLogOut && handleSignOut()"
          />
        </ul>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch, watchEffect } from "vue";
import { Icon, IconLoading, Button } from "../atoms";
import { ItemMenu } from "../molecules";
import icons from "../../assets/icons";
import userConnected from "../../stores/userConnected";
import { useRouter } from "vue-router";

const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

const useUserConnected = userConnected();
const router = useRouter();

const clickOnProfileMenu = ref(false);

interface ItemData {
  name: string;
  setLogOut?: boolean;
}
const itemListData: ItemData[] = [{ name: "Se déconnecter", setLogOut: true }];

const handleClickOnProfileMenu = () => {
  clickOnProfileMenu.value = !clickOnProfileMenu.value;
};

const handleSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    useUserConnected.resetUserConnected();
    handleClickOnProfileMenu();
    router.push("/");
    router.beforeResolve(() => router.go(0));
  } catch (error) {
    console.log(error);
    return null;
  }
};
</script>
