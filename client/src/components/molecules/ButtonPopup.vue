<template>
  <Button custom-button-class="w-2/3 mx-auto btn-blue" @click="confirmation"
    >Je confirme</Button
  >
  <Button custom-button-class="w-2/3 mx-auto btn-orange" @click="cancelation">
    Annuler
  </Button>
</template>

<script setup lang="ts">
defineProps<{
  confirmation: () => void;
  cancelation: () => void;
}>();
</script>
