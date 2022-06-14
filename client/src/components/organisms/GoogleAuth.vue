<template>
  <div class="flex">
    <div
      v-if="!useUserConnected.isInit"
      class="flex py-1 px-4 bg-gray-50 rounded"
    >
      <Icon
        type="solid"
        title="google"
        :d="[
          {
            path: icons.google.solid[1].path,
          },
          {
            path: icons.google.solid[2].path,
          },
          {
            path: icons.google.solid[3].path,
          },
          {
            path: icons.google.solid[4].path,
          },
        ]"
      />
      <Text tag="span" textCustomClass="text-sm ml-2"
        >Continuer avec Google</Text
      >
    </div>
    <div v-else title="Se connecter avec Google">
      <!-- {{ useUserConnected.handleIsInit(true) }} -->
      <Button>
        <div
          v-if="!useUserConnected.isAuth"
          @click="handleSignIn"
          class="flex py-1 px-4"
        >
          <Icon
            type="solid"
            title="google"
            :d="[
              {
                path: icons.google.solid[1].path,
                fill: icons.google.solid[1].fill,
              },
              {
                path: icons.google.solid[2].path,
                fill: icons.google.solid[2].fill,
              },
              {
                path: icons.google.solid[3].path,
                fill: icons.google.solid[3].fill,
              },
              {
                path: icons.google.solid[4].path,
                fill: icons.google.solid[4].fill,
              },
            ]"
          />
          <Text tag="span" textCustomClass="text-sm ml-2"
            >Continuer avec Google</Text
          >
        </div>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, watch, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import GET_ALL_USER from "../../graphql/Queries/user/GET_ALL_USER";
import AUTH_GOOGLE from "../../graphql/Mutations/user/AUTH_GOOGLE";
import usersListSore from "../../stores/usersListStore";
import userConnected from "../../stores/userConnected";
import { Icon, Text, Button, IconLoading } from "../../components/atoms";
import icons from "../../assets/icons";
import lt from "date-fns/locale/lt";
import type { User } from "../../interfaces/User";

const router = useRouter();
const useUsersList = usersListSore();
const useUserConnected = userConnected();
const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

// useUserConnected.handleIsInit(false);
// useUserConnected.handleIsAuth(false);
// const userStorage =
//   localStorage.userConnected && JSON.parse(localStorage.userConnected).user;

// watchEffect(async () => {
//   if (Vue3GoogleOauth.isInit) {
//     useUserConnected.handleIsInit(true);
//     if (Vue3GoogleOauth.isAuthorized) {
//       console.log("isAuth-gg", Vue3GoogleOauth.isAuthorized);
//       useUserConnected.handleIsAuth(true);
//     }
// if (!userStorage || !localStorage.userConnected) {
//   console.log("signout-gg", userStorage);

//   await Vue3GoogleOauth.instance.signOut();
// }
//   }
// });

const { result, loading, error } = useQuery(GET_ALL_USER);

watch(loading, () => {
  if (!error.value) {
    // Rafraichissement du store
    useUsersList.refreshUsersList(result.value.getAllUsers);
  }
});

const { mutate: authFromGoogle } = useMutation(AUTH_GOOGLE, () => ({
  update: async (cache, { data: { authFromGoogle } }) => {
    const data = await cache.readQuery({
      query: GET_ALL_USER,
    });
    const userData = (data as any).getAllUsers;
    cache.writeQuery({
      query: GET_ALL_USER,
      data: {
        getAllUsers: [...userData, authFromGoogle],
      },
    });
  },
}));

const handleSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();
    if (!googleUser) {
      return null;
    }
    // console.log("googleUser | ", googleUser.getAuthResponse());
    const token_id = googleUser.getAuthResponse().id_token;
    // tokenToSend.value = token_id;

    const email = googleUser.getBasicProfile().getEmail();
    // console.log(googleUser.getBasicProfile());
    console.log(email);

    await authFromGoogle({ tokenId: token_id }).then((res) => {
      if (!res?.data.error) {
        useUserConnected.setAuthInfo(res?.data.googleAuth);
      }
    });

    const userConnected: User[] = await result.value.getAllUsers.filter(
      (user: User): boolean => user.email === email
    );
    if (userConnected.length) {
      console.log(1);

      useUserConnected.setUserConnected(userConnected[0]);
    } else {
      console.log(2);

      const user = {
        email: email,
      };
      useUserConnected.setUserConnected(user);
    }

    useUserConnected.handleIsAuth(true);

    router.push("/platform");
    router.beforeResolve(() => router.go(0));
  } catch (error) {
    console.log(error);
    return null;
  }
};
</script>
