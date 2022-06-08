<template>
  <component
    :is="tag"
    :for="tag === 'label' ? labelFor : null"
    :class="tag === 'label' ? ['a-label', labelCustomClass] : textCustomClass"
    class="a-text"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  tag: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label";
  labelFor?: string;
  labelCustomClass?: string;
  textCustomClass?: string;
}>();
</script>
