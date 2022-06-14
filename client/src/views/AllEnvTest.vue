<template>
  <div class="mx-auto xl:w-4/5 2xl:w-3/5 py-8 relative">
    <icon-loading v-if="loading" />

    <Text tag="p" v-else-if="error">Erreur: Problème de chargement...</Text>
    <ul
      v-else-if="result && result.getAllEnv"
      class="flex flex-col justify-center mb-7"
      :class="
        popup.busy || popup.free || popup.deletedFor
          ? 'blur-sm pointer-events-none'
          : 'blur-none'
      "
    >
      <li
        class="flex items-center justify-between text-lg h-20 px-8 my-1 rounded shadow-md bg-[#fcfcfc89]"
        v-for="env in result.getAllEnv"
        :key="env.id"
        :env="env"
      >
        <Text tag="p" class="w-1/4">{{ env.name }}</Text>
        <Text tag="p" v-if="env.isFree" class="w-2/4 text-green-600 text-center"
          >Libre</Text
        >
        <div v-else class="w-2/4 text-center">
          <Text tag="p" class="text-red-600">Occupé</Text>
          <Text tag="p" class="text-xs capitalize">
            {{ useUserConnected.getFullName }} <br />
            {{
              format(parseInt(env.updatedAt), "dd MMMM yyyy", { locale: fr })
            }}
            - {{ format(parseInt(env.updatedAt), "HH:mm") }}
          </Text>
        </div>
        <div class="w-1/4 grid">
          <handle-activate
            :activate="!env.isFree"
            @click="(envToUpdate = env), displayPopup(env._id, false)"
            class="justify-self-end"
          />
        </div>
      </li>
    </ul>

    <!-- POPUP CONFIRMATION -->
    <div
      v-if="popup.busy || popup.free || popup.deletedFor"
      class="absolute top-0 origin-center bg-white h-64 w-full px-4 border border-black rounded flex flex-col justify-around items-center shadow-md z-50"
    >
      <Text tag="p" v-if="popup.busy"
        >Vous allez libérer {{ popup.envName }}</Text
      >
      <Text tag="p" v-else-if="popup.free"
        >Vous allez prendre {{ popup.envName }}</Text
      >
      <Text tag="p" v-else-if="popup.deletedFor">
        Êtes vous bien sûr de vouloir supprimer {{ popup.envName }} ?
      </Text>
      <Text tag="p" v-if="popup.busy || popup.free">
        N'oubliez pas de prévenir l'équipe sur #tech
      </Text>
      <div class="flex flex-col w-full">
        <Button
          custom-button-class="w-2/3 mx-auto btn-blue"
          @click="
            popup.deletedFor
              ? resetStatusDisponibility()
              : (resetStatusDisponibility(), updateEnvDisponibilityByID())
          "
          >Je confirme</Button
        >
        <Button
          custom-button-class="w-2/3 mx-auto btn-orange"
          @click="resetStatusDisponibility()"
        >
          Annuler
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { logErrorMessages } from "@vue/apollo-util";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import GET_ALL_ENV from "../graphql/Queries/envTest/GET_ALL_ENV";
import {
  CREATE_NEW_ENV,
  DELETE_ENV_BY_ID,
  UPDATE_ENV_DISPONIBILITY_BY_ID,
  UPDATE_ENV_NAME_BY_ID,
} from "../graphql/Mutations/envTest";
import { IconLoading, HandleActivate, Text, Button } from "../components/atoms";
import { GoogleAuth } from "../components/organisms";
import userConnected from "../stores/userConnected";
import envListStore from "../stores/envListStore";
import { useRouter } from "vue-router";
import type { Env } from "../interfaces/Env";

const useUserConnected = userConnected();
const useEnvList = envListStore();
const router = useRouter();

// console.log("useUserConnected | ", useUserConnected.getUser);
// Liste des environnements
const { result, loading, error } = useQuery(GET_ALL_ENV);

// Rafraichissement du store
watch(loading, () => {
  if (!error.value) {
    useEnvList.refreshEnvList(result.value.getAllEnv);
  }
});

// Gérer la popup de prévention
const popup = ref({ envName: "", free: false, busy: false, deletedFor: false });

const displayPopup = (idForChangement: any, isForDeleted: any) => {
  result.value.getAllEnv &&
    result.value.getAllEnv.map(({ _id, isFree, name }: Env) => {
      if (_id === idForChangement) {
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
      return;
    });
};

// Changer le statut de disponibilité
const envToUpdate: Ref<Env | undefined> = ref();

const resetStatusDisponibility = () => {
  popup.value.free = false;
  popup.value.busy = false;
  popup.value.deletedFor = false;
};
const { mutate: updateEnvDisponibilityByID, onError: errorOnEditedEnv } =
  useMutation(UPDATE_ENV_DISPONIBILITY_BY_ID, () => ({
    variables: {
      id: envToUpdate.value?._id,
      input: {
        isFree: !envToUpdate.value?.isFree,
        email: useUserConnected.getEmail,
      },
    },
    update: (cache) => {
      const data = cache.readQuery({ query: GET_ALL_ENV });
      const envData = (data as any).getAllEnv;
      cache.writeQuery({
        query: GET_ALL_ENV,
        data: {
          getAllEnv: [...envData],
        },
      });
    },
  }));
errorOnEditedEnv((error) => {
  logErrorMessages(error);
});
</script>
