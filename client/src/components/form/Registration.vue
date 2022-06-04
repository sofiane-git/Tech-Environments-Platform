<template>
  <div class="border py-6 rounded-sm drop-shadow-sm shadow-lg text-center">
    <InputWithError
        placeholderValue="Nom"
        :error="useFormData.errors.value.lastName"
        v-model="lastName"
    />
    <InputWithError
        placeholderValue="Prénom"
        :error="useFormData.errors.value.firstName"
        v-model="firstName"
    />
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
    <InputWithError
        placeholderValue="Confirmation mot de passe"
        :error="useFormData.errors.value.passwordConfirmation"
        v-model="passwordConfirmation"
    />

      <button
        class="btn btn-blue"
        @click="submitForm"
      >
        Créer un compte
      </button>
  </div>
</template>

<script setup>
  import { useField, useForm } from 'vee-validate'
  import InputWithError from './InputWithError.vue';
  import {ScRegistration} from './schema'

  const useFormData = useForm({
      validationSchema: ScRegistration,
  })

  const { handleSubmit } = useFormData

  const { value: email } = useField('email')

  const { value: password } = useField('password')

  const { value: firstName } = useField('firstName')

  const { value: lastName } = useField('lastName')

  const { value: passwordConfirmation } = useField('passwordConfirmation')


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
        firstName: firstName.value,
        lastName: lastName.value,
        passwordConfirmation: passwordConfirmation.value
    })
  })


</script>