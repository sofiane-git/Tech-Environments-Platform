<template>
  <div class="mx-auto xl:w-4/5 2xl:w-3/5 py-8 relative">
    <icon-loading v-if="loading" />

    <Text tag="p" v-else-if="error">Erreur: Problème de chargement...</Text>
    <div v-else-if="result && result.getAllEnv" class="grid">
      <ul
        v-if="result.getAllEnv.length"
        class="flex flex-col justify-center mb-7"
        :class="
          popup.busy || popup.free || popup.deletedFor
            ? 'blur-sm pointer-events-none'
            : 'blur-none'
        "
      >
        <li
          class="flex items-center justify-between text-lg h-20 pl-8 pr-1 my-1 rounded shadow-md bg-[#fcfcfc89]"
          v-for="env in result.getAllEnv"
          :key="env.id"
          :env="env"
        >
          <div class="w-1/4 flex group">
            <Text tag="p">
              {{ env.name }}
            </Text>
          </div>
          <!-- <input-field
            :value="env.name"
            :disabled="padlock"
            input-type="text"
            class="w-1/4"
            placeholder="Nom"
            :label-content="!padlock ? 'Nom' : null"
            v-model="env.name"
          /> -->
          <Text
            tag="p"
            v-if="env.isFree"
            class="w-2/4 text-green-600 text-center"
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
          <div class="w-1/4 grid grid-rows-6 h-full">
            <div class="justify-self-end self-start group row-span-1">
              <!-- <Button
                custom-button-class="p-0 m-0 border-0 w-5 hover:shadow-none "
              >
                <Icon
                  type="outline"
                  :d="[{ path: icons.dots_horizontal.outline.path }]"
                  title="Modifier environnement"
                  custom-class="text-slate-200 group-hover:text-slate-300 p-0 m-0"
                />
              </Button> -->
              <button-with-icon
                icon-type="outline"
                :d="[{ path: icons.dots_horizontal.outline.path }]"
                title="Modifier environnement"
              />
            </div>

            <div class="row-span-6 justify-self-center self-center pb-3.5">
              <handle-activate
                :activate="!env.isFree"
                @click="(envToUpdate = env), displayPopup(env._id, false)"
              />
            </div>
          </div>
        </li>
      </ul>
      <div v-else>
        <Text tag="p" class="text-center mb-8"
          >Commencez par ajouter un environnement</Text
        >
        <button-with-icon
          class="justify-self-end h-full"
          icon-type="outline"
          :d="[{ path: icons.add_croise.outline.path }]"
          title="Ajouter environnement"
          custom-icon-class="w-10"
          custom-button-class="w-10"
        />
      </div>
    </div>

    <!-- POPUP CONFIRMATION -->
    <!-- <div
      v-if="popup.busy || popup.free || popup.deletedFor"
      class="absolute top-0 origin-center bg-white h-64 w-full px-4 border border-black rounded flex flex-col justify-around items-center shadow-md z-50"
    >
      <div class="font-bold">
        <Text tag="h3" v-if="popup.busy"
          >Vous allez libérer {{ popup.envName }}</Text
        >
        <Text tag="h3" v-else-if="popup.free"
          >Vous allez prendre {{ popup.envName }}</Text
        >
        <Text tag="h3" v-else-if="popup.deletedFor">
          Êtes vous bien sûr de vouloir supprimer {{ popup.envName }} ?
        </Text>
      </div>
      <Text tag="p" v-if="popup.busy || popup.free" class="text-center">
        Après confirmation, un message sera envoyé <br />
        sur le canal Slack
        <Text
          class="bg-red-50 px-1 a-navlink cursor-pointer"
          tag="a"
          :href="config.SLACK_CHANNEL_PLATFORM"
          target="_blank"
          >#tech-environments-platform</Text
        >
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
    </div> -->

    <popup-handler
      :popup="popup"
      :href="config.SLACK_CHANNEL_PLATFORM"
      :update-env="updateEnvDisponibilityByID"
    >
      <template #button_group>
        <button-group :popup="popup" />
      </template>
    </popup-handler>
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
import { UPDATE_ENV_DISPONIBILITY_BY_ID } from "../graphql/Mutations/envTest";
import {
  IconLoading,
  HandleActivate,
  Text,
  Button,
  Icon,
} from "../components/atoms";
import { ButtonWithIcon } from "../components/molecules";
import { ButtonGroup } from "../components/organisms";
import { PopupHandler } from "../components/templates";
import userConnected from "../stores/userConnected";
import envListStore from "../stores/envListStore";
import type { Env } from "../interfaces/Env";
import icons from "../assets/icons";
import config from "../config";
import lt from "date-fns/locale/lt";

const useUserConnected = userConnected();
const useEnvList = envListStore();

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
watch(popup.value, () => {
  console.log("popup | ", popup.value);
});
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

// const resetStatusDisponibility = () => {
//   popup.value.free = false;
//   popup.value.busy = false;
//   popup.value.deletedFor = false;
// };

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
