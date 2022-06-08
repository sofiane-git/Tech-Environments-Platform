<template>
  <div class="flex">
    <div
      v-if="!useUserConnected.getUserConnectedIsInit"
      class="flex py-1 px-4 bg-gray-50 rounded"
    >
      <!-- {{ useUserConnected.handleIsInit(false) }} -->
      <!-- <icon-loading /> -->
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
          v-if="!useUserConnected.getUserConnectedIsAuth"
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
import { inject, onMounted, ref, watch, watchEffect } from "vue";
import CREATE_USER from "../../graphql/Mutations/user/CREATE_USER";
import { useMutation, useQuery } from "@vue/apollo-composable";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import usersListSore from "../../stores/usersListStore";
import GET_ALL_USER from "../../graphql/Queries/user/GET_ALL_USER";
import userConnected from "../../stores/userConnected";
import { Icon, Text, Button, IconLoading } from "../../components/atoms";
import icons from "../../assets/icons";

const router = useRouter();
const useUsersListSore = usersListSore();
const useUserConnected = userConnected();
const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

console.log("isInit", useUserConnected.getUserConnectedIsInit);
console.log("isAuth", useUserConnected.getUserConnectedIsAuth);

onMounted(() => {
  useUserConnected.handleIsInit(false);
  useUserConnected.handleIsAuth(false);
});
watchEffect(async () => {
  console.log("isInit2", useUserConnected.getUserConnectedIsInit);

  if (Vue3GoogleOauth.isInit) {
    useUserConnected.handleIsInit(true);
    console.log("isInit3", useUserConnected.getUserConnectedIsInit);

    if (!localStorage.userConnected) {
      await Vue3GoogleOauth.instance.signOut();
    }

    console.log("ok isAuth => ", Vue3GoogleOauth.isAuthorized);
  }
});
// watchEffect(() => {
//   if (Vue3GoogleOauth.isAuthorized) {
//     // useUserConnected.handleIsAuth(true);
//     // console.log("isAuth2", useUserConnected.getUserConnectedIsAuth);
//     console.log("ok", Vue3GoogleOauth.isAuthorized);
//   }
// });

// Rafraichissement du store
const { result, loading, error } = useQuery(GET_ALL_USER);

watch(loading, () =>
  useUsersListSore.refreshUsersList(result.value.getAllUsers)
);

const emailToSend = ref("");
const {
  mutate: createNewUser,
  onDone: resetValue,
  onError: errorOnCreatedUser,
} = useMutation(CREATE_USER, () => ({
  variables: {
    input: {
      email: emailToSend.value,
    },
  },
  update: async (cache, { data: { createNewUser } }) => {
    const data = await cache.readQuery({
      query: GET_ALL_USER,
    });
    const userData = (data as any).getAllUsers;
    console.log("data | ", userData);
    cache.writeQuery({
      query: GET_ALL_USER,
      data: {
        getAllUsers: [...userData, createNewUser],
      },
    });
  },
}));

const userFullName = ref("");

if (localStorage.userConnected) {
  const userStorage = JSON.parse(localStorage.userConnected);

  userFullName.value = userStorage.user?.fullName;
}

const handleSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();
    if (!googleUser) {
      return null;
    }
    emailToSend.value = googleUser.getBasicProfile().getEmail();

    useUserConnected.setUserConnected(emailToSend.value);
    useUserConnected.handleIsAuth(true);
    // SI PAS PRESENT, ENREGISTREMENT DANS LA DB
    const emailOnDb = result.value.getAllUsers.filter(
      (user: any) => user.email === emailToSend.value
    );
    if (!emailOnDb.length) {
      createNewUser({ input: { email: emailToSend.value.trim() } });
      resetValue(() => {
        emailToSend.value = "";
      });
    }
    router.push({ name: "platform" });
  } catch (error) {
    console.log(error);
    return null;
  }
};
</script>
