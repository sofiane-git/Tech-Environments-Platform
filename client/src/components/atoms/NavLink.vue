<template>
  <router-link class="a-navlink" active-class="text-blue-400" :to="link">{{
    content
  }}</router-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string;
  content: string;
}>();
</script>
