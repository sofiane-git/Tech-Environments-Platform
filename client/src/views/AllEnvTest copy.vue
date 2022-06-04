<template>
  <div class="mx-auto xl:w-4/5 2xl:w-3/5 py-8">
    <ul
      v-if="result && result.getAllEnvTest"
      class="flex flex-col justify-center pb-7"
      :class="
        popup.free || popup.busy || popup.deletedFor ? 'blur-sm' : 'blur-none'
      "
    >
      <li
        class="flex items-center text-center text-lg border-black border-2 h-20 my-1 rounded"
        v-for="env in envList"
        :key="env.id"
        :env="env"
      >
        <p class="w-1/4">{{ env.name }}</p>
        <p v-if="env.isFree" class="w-2/4 text-green-600">Libre</p>
        <div v-else class="w-2/4">
          <p class="text-red-600">Occupé</p>
          <p class="text-xs">
            par
            <span class="capitalize"> {{ env.updatedBy && env.updatedBy }}</span
            >, le
            <span class="capitalize"
              >{{
                format(parseInt(env.updatedAt), "dd MMMM yyyy", { locale: fr })
              }}
            </span>
            à {{ format(parseInt(env.updatedAt), "HH:mm") }}
          </p>
        </div>

        <div class="w-1/4">
          <button
            class="btn disabled:bg-gray-200"
            :class="env.isFree ? 'btn-blue' : 'btn-orange'"
            @click="(envToUpdate = env), displayPopup(env.id, false)"
            :disabled="
              popup.busy ||
              popup.free ||
              popup.deletedFor ||
              !userStore.getters.getLoginUserInfo
            "
          >
            <span v-if="env.isFree" title="Utiliser environnement"
              >Utiliser</span
            >
            <span v-else title="Libérer environnement">Libérer</span>
          </button>
        </div>

        <!-- SUPPRESSION ENVIRONNEMENT -->
        <button
          class="self-start text-red-300 hover:text-red-500 disabled:text-gray-200"
          @click="
            (idToDelete = env.id),
              displayPopup(env.id, true),
              (messageConfirmationDeleted = '')
          "
          :disabled="
            popup.busy ||
            popup.free ||
            popup.deletedFor ||
            !userStore.getters.getLoginUserInfo
          "
          title="Supprimer environnement"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
    <!-- POPUP CONFIRMATION -->
    <div
      v-if="popup.busy || popup.free || popup.deletedFor"
      class="absolute top-52 left-1/3 origin-center bg-white h-80 w-1/3 px-4 border border-black rounded flex flex-col justify-around items-center shadow-md z-50"
    >
      <p v-if="popup.busy">Vous allez libérer {{ popup.envName }}</p>
      <p v-else-if="popup.free">Vous allez prendre {{ popup.envName }}</p>
      <p v-else-if="popup.deletedFor">
        Êtes vous bien sûr de vouloir supprimer {{ popup.envName }} ?
      </p>
      <p v-if="popup.busy || popup.free">
        N'oubliez pas de prévenir l'équipe sur #tech
      </p>
      <div class="flex flex-col w-full">
        <button
          class="btn"
          :class="popup.busy ? 'btn-blue' : 'btn-orange'"
          @click="
            popup.deletedFor
              ? (resetStatusDisponibility(), deleteEnvByID())
              : (resetStatusDisponibility(), editEnvByID())
          "
        >
          Je confirme
        </button>
        <button
          class="btn mt-2"
          :class="!popup.busy ? 'btn-blue' : 'btn-orange'"
          @click="resetStatusDisponibility"
        >
          Annuler
        </button>
      </div>
    </div>
    <!-- AJOUT NOUVEL ENV -->
    <div
      class="w-full border border-black p-2 flex flex-col justify-center rounded"
      :class="
        popup.free || popup.busy || popup.deletedFor ? 'blur-sm' : 'blur-none'
      "
    >
      <div class="p-2 flex flex-col items-center">
        <label class="mb-2">Ajouter un nouvel environnement</label>
        <input
          class="w-3/4 px-3 py-1 border rounded"
          v-model="newEnv"
          @keyup.enter="createNewEnv"
          @keydown="errorOnCreate = false"
          @focus="errorOnCreate = false"
          placeholder="Nom du nouvel env"
          :disabled="
            popup.busy ||
            popup.free ||
            popup.deletedFor ||
            !userStore.getters.getLoginUserInfo
          "
          title="Entrer ici le nom du nouvel environnement"
        />
      </div>
      <div v-if="errorOnCreate">
        <p
          v-if="!userStore.getters.getLoginUserInfo"
          class="text-red-500 text-center pb-2"
        >
          Il faut être connecté l'ami !
        </p>

        <p v-else class="text-red-500 text-center pb-2">
          Le nom d'environnement ne doit ni être vide, ni existant
        </p>
      </div>
      <button
        @click="createNewEnv"
        class="btn btn-blue disabled:bg-gray-200"
        :disabled="
          popup.busy ||
          popup.free ||
          popup.deletedFor ||
          !userStore.getters.getLoginUserInfo
        "
        title="Ajouter environnement"
      >
        Ajouter
      </button>
    </div>

    <!-- CONFIRMATION DE LA SUPPRESSION -->
    <div
      v-if="messageConfirmationDeleted !== ''"
      class="messageConfirmation absolute transition-all py-2 px-4 mb-6 border-red-500 border bg-white text-center"
    >
      <span>{{ messageConfirmationDeleted }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { logErrorMessages } from "@vue/apollo-util";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
// import userStore from "../store/userStore.vue";

import ENV_LIST from "@/graphql/Queries/GET_ALL_ENV";

// const storeUser = store.getters.getLoginUserInfo

// console.log(typeof(userStore.getters.getLoginUserInfo), userStore.getters.getLoginUserInfo);

// Liste des environnements
const { result } = useQuery(ENV_LIST);
const envList = useResult(result, []);

// Créer nouvel env
const newEnv = ref("");
const {
  mutate: createNewEnv,
  onDone: resetValue,
  onError: errorOnCreatedEnv,
} = useMutation(
  gql`
    mutation CREATE_NEW_ENV($name: String!, $updatedBy: String!) {
      createNewEnv(newEnv: { name: $name, updatedBy: $updatedBy }) {
        id
        name
        isFree
        updatedAt
        updatedBy
      }
    }
  `,
  () => ({
    variables: {
      name: newEnv.value.trim(),
      updatedBy: userStore.getters.getLoginUserInfo,
    },
    update: (cache, { data: { createNewEnv } }) => {
      const data = cache.readQuery({
        query: ENV_LIST,
      });
      cache.writeQuery({
        query: ENV_LIST,
        data: {
          getAllEnvTest: [...data.getAllEnvTest, createNewEnv],
        },
      });
    },
  })
);

const idToDelete = ref("");
const messageConfirmationDeleted = ref("");
const { mutate: deleteEnvByID, onError: errorOnDeletedEnv } = useMutation(
  gql`
    mutation DELETE_ENV_BY_ID($id: ID!, $deletedBy: String!) {
      deleteEnvByID(id: $id, deletedBy: $deletedBy) {
        id
        deletedBy
        message
        success
      }
    }
  `,
  () => ({
    variables: {
      id: idToDelete.value,
      deletedBy: userStore.getters.getLoginUserInfo,
    },
    update: (cache, { data: { deleteEnvByID } }) => {
      messageConfirmationDeleted.value = deleteEnvByID.message;
      const data = cache.readQuery({ query: ENV_LIST });
      let newData = [...data.getAllEnvTest];
      newData = data.getAllEnvTest.filter(({ id }) => id !== deleteEnvByID.id);

      cache.writeQuery({
        query: ENV_LIST,
        data: {
          ...data,
          getAllEnvTest: newData,
        },
      });
    },
  })
);

resetValue(() => {
  newEnv.value = "";
});

const errorOnCreate = ref(false);
errorOnCreatedEnv((error) => {
  errorOnCreate.value = true;
  newEnv.value = "";
  logErrorMessages(error);
});

// Gérer la popup de prévention
const popup = ref({ envName: "", free: false, busy: false, deletedFor: false });

const displayPopup = (idForChangement, isForDeleted) => {
  envList.value &&
    envList.value.map(({ id, isFree, name }) => {
      if (id === idForChangement) {
        isForDeleted
          ? ((popup.value.envName = name),
            (popup.value.free = false),
            (popup.value.busy = false),
            (popup.value.deletedFor = true))
          : isFree
          ? ((popup.value.envName = name),
            (popup.value.free = true),
            (popup.value.busy = false),
            (popup.value.deletedFor = false))
          : ((popup.value.envName = name),
            (popup.value.free = false),
            (popup.value.busy = true),
            (popup.value.deletedFor = false));
      }
    });
};

// Changer le statut de disponibilité
const envToUpdate = ref("");
const resetStatusDisponibility = () => {
  popup.value.free = false;
  popup.value.busy = false;
  popup.value.deletedFor = false;
};
const { mutate: editEnvByID, onError: errorOnEditedEnv } = useMutation(
  gql`
    mutation EDIT_ENV_BY_ID($id: ID!, $updateEnv: EnvInput!) {
      editEnvByID(id: $id, updateEnv: $updateEnv) {
        id
        name
        isFree
        createdAt
        updatedAt
        updatedBy
      }
    }
  `,
  () => ({
    variables: {
      id: envToUpdate.value.id,
      updateEnv: {
        name: envToUpdate.value.name,
        isFree: !envToUpdate.value.isFree,
        updatedBy: userStore.getters.getLoginUserInfo,
      },
    },
    update: (cache) => {
      const data = cache.readQuery({ query: ENV_LIST });
      cache.writeQuery({
        query: ENV_LIST,
        data: {
          getAllEnvTest: [...data.getAllEnvTest],
        },
      });
    },
  })
);
errorOnEditedEnv((error) => {
  logErrorMessages(error);
});
</script>

<style scoped>
.messageConfirmation {
  animation: messageAnimation 3s ease-in-out;
  opacity: 0;
  bottom: 0;
  left: -313px;
}

@keyframes messageAnimation {
  0% {
    opacity: 0;
    left: -313px;
  }
  5% {
    opacity: 1;
    left: 1px;
  }
  95% {
    opacity: 1;
    left: 1px;
  }
  100% {
    opacity: 0;
    left: -313px;
  }
}
</style>
