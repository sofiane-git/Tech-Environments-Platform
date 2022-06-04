<script>
  import { computed } from 'vue';
  import * as yup from 'yup'

  const schema = computed(() =>
    yup.object({
      email: yup
        .string()
        .required('L\'adresse email est obligatoire' )
        .email('Cette adresse mail n\'est pas valide'),
      firstName: yup
        .string()
        .required('Le nom est obligatoire')
        .min(2, 'Le nom doit contenir minimum 2 caractères'),
      lastName: yup
        .string()
        .required('Le prénom est obligatoire')
        .min(2, 'Le prénom doit contenir minimum 2 caractères'),
      password: yup
        .string()
        .required('Le mot de passe est obligatoire')
        .min(6, 'Le mot de passe doit contenir minimum 6 caractères'),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Les mots de passe doivent être identiques')
      })
  )
 export default schema.value

</script>