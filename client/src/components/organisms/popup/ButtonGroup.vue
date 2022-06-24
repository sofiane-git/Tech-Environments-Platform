<template>
  <Button custom-button-class="w-2/3 mx-auto btn-blue">Je confirme</Button>
  <Button
    custom-button-class="w-2/3 mx-auto btn-orange"
    @click="resetStatusDisponibility(popup)"
  >
    Annuler
  </Button>
</template>

<script setup lang="ts">
// import type { Ref } from "vue";
import type Popup from "../../../interfaces/Popup";
import { Button } from "../../atoms";

defineProps<{
  popup: Popup;
}>();

const resetStatusDisponibility = (popup: any) => {
  console.log("resetStatusDisponibility");

  popup.free = false;
  popup.busy = false;
  popup.deletedFor = false;

  console.log(popup);
};
</script>
