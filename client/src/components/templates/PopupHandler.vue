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
import type { Ref } from "vue";
import {
  ForCreated,
  ForDeleted,
  ForDisponibility,
  ButtonGroup,
} from "../organisms";

defineProps<{
  popup: any;
  href: string;
}>();
</script>
