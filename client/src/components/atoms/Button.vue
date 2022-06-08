<template>
  <button
    class="a-button"
    :class="customButtonClass"
    :disabled="editDisabled"
    :type="type ? type : 'button'"
  >
    <slot />
    {{ content }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  content?: string;
  customButtonClass?: string;
  editDisabled?: boolean;
  type?: "submit" | "button";
}>();
</script>
