<template>
  <div class="h-3/5 flex flex-col items-center justify-between">
    <Text tag="h3" text-custom-class="uppercase">Identification requise</Text>
    <div class="text-center">
      <Text tag="p"
        >Pour consulter les environnements de test, <br />
        il vous faut utiliser votre adresse mail Skilleos</Text
      >
    </div>
    <google-auth />
    <input-field
      input-type="password"
      label-content="Mot de  passe"
      v-model="inputValue"
    />
    <input-field label-content="text" input-type="text" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Text } from "../components/atoms";
import { InputField } from "../components/molecules";
import { GoogleAuth, ProfilMenu } from "../components/organisms";

const inputValue = ref("");
watch(inputValue, () => {
  console.log(inputValue.value);
});
</script>
