<template>
  <div class="border py-6 rounded-sm drop-shadow-sm shadow-lg text-center">
    <InputWithError
      placeholderValue="Email"
      :error="useFormData.errors.value.email"
      v-model="email"
    />

    <InputWithError
      placeholderValue="Mot de passe"
      :error="useFormData.errors.value.password"
      v-model="password"
    />

    <button class="btn btn-blue" @click="submitForm">Se connecter</button>
  </div>
</template>

<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { ScAuthentication } from "./schema";
import InputWithError from "./InputWithError.vue";
// import { useStore } from 'vuex'

const emits = defineEmits(["submitAuth"]);

const useFormData = useForm({
  validationSchema: ScAuthentication,
});

const { handleSubmit } = useFormData;

const { value: email } = useField("email");

const { value: password } = useField("password");

// watchEffect(
//   () => console.log(props.isLogin)
// )

const submitForm = handleSubmit(() => {
  // emits('submitAuth', {
  //     email: email.value,
  //     password: password.value,
  // })
  console.log({
    email: email.value,
    password: password.value,
  });
});
</script>
