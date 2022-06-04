<template>
  <div class="mx-auto xl:w-4/5 2xl:w-3/5 py-8">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Erreur: {{ error.message }}</p>
    <ul
      v-else-if="result && result.getAllEnv"
      class="flex flex-col justify-center pb-7"
    >
      <li
        class="flex items-center text-center text-lg border-black border-2 h-20 my-1 rounded"
        v-for="env in result.getAllEnv"
        :key="env.id"
        :env="env"
      >
        <p class="w-1/4">{{ env.name }}</p>
        <p v-if="env.isFree" class="w-2/4 text-green-600">Libre</p>
        <div v-else class="w-2/4">
          <p class="text-red-600">Occupé</p>
          <p class="text-xs">
            par
            <span class="capitalize"> {{ env.updatedBy.email }}</span
            >, le
            <span class="capitalize"
              >{{
                format(parseInt(env.updatedAt), "dd MMMM yyyy", { locale: fr })
              }}
            </span>
            à {{ format(parseInt(env.updatedAt), "HH:mm") }}
          </p>
        </div>
      </li>
    </ul>
    <!-- <div v-if="!Vue3GoogleOauth.isInit">
      <span class="text-xs">Loading...</span>
    </div>

    <div v-else>
      <GoogleAuth class="absolute bottom-0 left-0" />
    </div> -->
    <GoogleAuth class="absolute bottom-0 left-0" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watchEffect } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { logErrorMessages } from "@vue/apollo-util";
import { format } from "date-fns";
import { fr, lt } from "date-fns/locale";
import useEnvStore from "../stores/envStore";
import GET_ALL_ENV from "../graphql/Queries/envTest/GET_ALL_ENV";
import {
  CREATE_NEW_ENV,
  DELETE_ENV_BY_ID,
  UPDATE_ENV_DISPONIBILITY_BY_ID,
  UPDATE_ENV_NAME_BY_ID,
} from "../graphql/Mutations/envTest";
import GoogleAuth from "../components/form/GoogleAuth.vue";
import { useRouter } from "vue-router";

// const Vue3GoogleOauth: any = inject("Vue3GoogleOauth");

// Liste des environnements
const { result, loading, error } = useQuery(GET_ALL_ENV);
</script>
