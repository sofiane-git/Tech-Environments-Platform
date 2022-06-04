<template>
  <div class="h-3/5 flex flex-col items-center justify-between">
    <h3 class="uppercase">Identification requise</h3>
    <div class="text-center">
      <p class="mb-1">Pour consulter les environnements de test,</p>
      <p>il vous faut utiliser votre adresse mail Skilleos</p>
    </div>
    <GoogleAuth />
  </div>
</template>

<script setup lang="ts">
import GoogleAuth from "../components/form/GoogleAuth.vue";
</script>
