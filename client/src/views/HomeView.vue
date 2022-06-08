<template>
  <div class="h-3/5 flex flex-col items-center justify-between">
    <h3 class="uppercase">Identification requise</h3>
    <!-- <div class="text-center">
      <p class="mb-1">Pour consulter les environnements de test,</p>
      <p>il vous faut utiliser votre adresse mail Skilleos</p>
    </div>
    <GoogleAuth /> -->
    <Text tag="p">klzfhqklfhslkhglshglskhglks</Text>
    <Input type="text" input-custom-class="bg-red-100" />
    <Input type="checkbox" input-custom-class="h-26" />

    <InputField
      input-type="email"
      id="email"
      label-content="Email"
      placeholder="Votre email"
      name="email"
      v-model.trim="emailValue"
    />

    <ButtonWithIcon
      title="add"
      icon-type="solid"
      :d="[{ path: icons.add_croise_sm.solid.path }]"
      button-content="Ajouter"
      custom-icon-class="bg-red-100"
    />

    <input-password
      input-id="password"
      label-name="Mot de passe"
      placeholder="Votre mot de passe"
      v-model.trim="passwordValue"
      v-on:focusout="showValue"
    />
    <button @click="showValue">click</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { GoogleAuth } from "../components/organisms";
import icons from "../assets/icons";
import { Text, Input } from "../components/atoms";
import { InputField, ButtonWithIcon } from "../components/molecules";
import { InputPassword } from "../components/organisms";

const emailValue = ref("");
const passwordValue = ref("");

const showValue = () => console.log(passwordValue.value);
</script>
