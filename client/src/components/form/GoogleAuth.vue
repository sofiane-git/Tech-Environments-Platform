<template>
  <div class="flex">
    <div v-if="!Vue3GoogleOauth.isInit">
      <span class="text-xs">Loading...</span>
    </div>
    <div v-else>
      <button
        class="flex text-lg transition rounded border disabled:bg-gray-300 hover:border-black hover:shadow-md py-2 dark:text-black dark:bg-white"
      >
        <!-- BOUTON NON CONNECTE -->
        <div
          v-if="!Vue3GoogleOauth.isAuthorized"
          @click="handleSignIn"
          class="flex py-1 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <title>Google</title>
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#4285F4"
                d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
              ></path>
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
              ></path>
              <path
                fill="#FBBC05"
                d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
              ></path>
              <path
                fill="#EA4335"
                d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
              ></path>
            </g>
          </svg>
          <span class="text-sm ml-2" title="Se connecter avec Google">
            Continuer avec Google
          </span>
        </div>

        <!-- BOUTON CONNECTE -->
        <div
          v-else
          @click="handleClickOnProfileMenu"
          class="py-1 px-4 text-sm"
          title="Menu"
        >
          <span> {{ userFullName }} </span>
        </div>
      </button>
    </div>

    <div
      v-if="clickOnProfileMenu"
      class="transition text-sm text-center my-auto border ml-2 rounded shadow-sm dark:text-black dark:bg-white"
    >
      <ul>
        <li>
          <button
            class="hover:bg-blue-50 my-auto w-full py-3 px-2"
            @click="handleSignOut"
          >
            Se déconnecter
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import CREATE_USER from "../../graphql/Mutations/user/CREATE_USER";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { lt } from "date-fns/esm/locale";
import { inject, ref, watch } from "vue";
import { useRouter } from "vue-router";
import usersListSore from "../../stores/usersListStore";
import GET_ALL_USER from "../../graphql/Queries/user/GET_ALL_USER";
import userConnected from "../../stores/userConnected";

const router = useRouter();
const useUsersListSore = usersListSore();
const useUserConnected = userConnected();
const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

const clickOnProfileMenu = ref(false);

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

const userStorage = JSON.parse(localStorage.userConnected);

const userFullName = ref(userStorage.user?.fullName);

const handleClickOnProfileMenu = () => {
  clickOnProfileMenu.value = !clickOnProfileMenu.value;
};

const handleSignIn = async () => {
  try {
    const googleUser = await Vue3GoogleOauth.instance.signIn();

    if (!googleUser) {
      return null;
    }
    emailToSend.value = googleUser.getBasicProfile().getEmail();

    useUserConnected.setUserConnected(emailToSend.value);

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
    router.push("/platform");
  } catch (error) {
    console.log(error);
    return null;
  }
};
const handleSignOut = async () => {
  try {
    await Vue3GoogleOauth.instance.signOut();
    useUserConnected.resetUserConnected();
    handleClickOnProfileMenu();
    router.go(0);
  } catch (error) {
    console.log(error);
    return null;
  }
};
</script>
