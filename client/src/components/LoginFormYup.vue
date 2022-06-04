<template>
    <div class="px-4 h-screen">
        <div 
            class="flex flex-col flex-wrap text-center justify-evenly" 
            :class="isLogin ? 'h-2/5' : 'h-4/5'"
        >
            <h2 :class="isLogin ? 'bg-green-200 py-2 rounded border border-green-400' : 'bg-orange-200 py-2 rounded border border-orange-400'">
                {{ isLogin ? 'Formulaire de connexion' : 'Formulaire d\'inscription' }}
            </h2>

             <template v-if="!isLogin">
                <!-- <input
                    type="text"
                    placeholder="Nom"
                    v-model="firstName"
                    class="inputForm"
                />
                <p class="errorMessage text-left">
                    {{ useFormData.errors.value.firstName }}
                </p> -->
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



            </template>



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

            <template v-if="!isLogin">
                <InputWithError
                    placeholderValue="Confirmation mot de passe"
                    :error="useFormData.errors.value.passwordConfirmation"
                    v-model="passwordConfirmation"
                />


            </template>



            <button
                class="btn btn-blue"
                @click="submitForm"
            >
                {{ isLogin ? 'C\'est parti !' : 'Créer un compte' }}
            </button>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputWithError from './form/InputWithError.vue'
// import { useStore } from 'vuex'

export default defineComponent({
    name: "LoginFormYup",
    props: {
        isLogin: {
            type: Boolean,
        },
        isSubmitting: {
            type: Boolean,
        },
    },
    emits: {
        submitAuth: null
    },
    setup(props, { emit }) {
        const schema = computed(() => yup.object({
            email: yup.string()
                .required("L'adresse email est obligatoire")
                .email("Cette adresse mail n'est pas valide"),
            firstName: yup.string()
                .required("Le prénom est obligatoire")
                .min(2, "Le prénom doit contenir minimum 2 caractères"),
            lastName: yup.string()
                .required("Le nom est obligatoire")
                .min(2, "Le nom doit contenir minimum 2 caractères"),
            password: yup.string()
                .required("Le mot de passe est obligatoire")
                .min(6, "Le mot de passe doit contenir minimum 6 caractères"),
            passwordConfirmation: yup.string()
                .oneOf([yup.ref("password"), null], "Les mots de passe doivent être identiques")
        }));
        const useFormData = useForm({
            validationSchema: schema,
        });
        const { handleSubmit } = useFormData;
        const { value: email } = useField("email");
        const { value: password } = useField("password");
        const { value: firstName } = useField("firstName");
        const { value: lastName } = useField("lastName");
        const { value: passwordConfirmation } = useField("passwordConfirmation");
        // watchEffect(
        //   () => console.log(props.isLogin)
        // )
        const submitForm = handleSubmit(() => {
            // emit("submitAuth", {
            //     email: email.value,
            //     password: password.value,
            // });
            console.log("submitForm");
        });
        return {
            submitForm,
            email,
            useFormData,
            password,
            firstName,
            lastName,
            passwordConfirmation
        };
    },
    components: { InputWithError }
})


</script>