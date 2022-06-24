<template>
  <button
    class="a-button"
    :class="customButtonClass"
    :disabled="editDisabled"
    :type="type ? type : 'button'"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  customButtonClass?: string;
  editDisabled?: boolean;
  type?: "submit" | "button";
}>();
</script>
