<script>
import { computed } from 'vue';
  import * as yup from 'yup'
  const schema = computed(() =>
    yup.object({
      email: yup
        .string()
        .required('L\'adresse email est obligatoire' )
        .email('Cette adresse mail n\'est pas valide'),
      password: yup
        .string()
        .required('Le mot de passe est obligatoire')
        .min(6, 'Le mot de passe doit contenir minimum 6 caractères'),
      })
  )
 export default schema.value
</script>