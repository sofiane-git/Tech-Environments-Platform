<template>
  <textarea
    :v-model="modelValue"
    :id="id"
    :name="name"
    class="a-textarea"
    :placeholder="placeholder"
    :disabled="disabled"
  >
  </textarea>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: any;
  id?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
}>();
</script>
