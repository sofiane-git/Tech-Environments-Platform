<template>
  <div v-if="popup.free || popup.busy || popup.deletedFor">
    <for-disponibility
      v-if="popup.free || popup.busy"
      :is-free="popup.free"
      :env-name="popup.envName"
      :href="href"
    >
      <template #button_group>
        <slot name="button_group" />
      </template>
    </for-disponibility>
  </div>
</template>

<script setup lang="ts">
import { ForCreated, ForDeleted, ForDisponibility } from "../organisms";

type Popup = {
  envName: string;
  free: boolean;
  busy: boolean;
  deletedFor: boolean;
};
defineProps<{
  popup: Popup;
  href: string;
}>();
</script>
