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
  </div>
</template>

<script setup lang="ts">
import { Text } from "../components/atoms";
import { GoogleAuth, ProfilMenu } from "../components/organisms";
</script>
