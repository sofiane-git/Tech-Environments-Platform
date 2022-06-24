<template>
  <input
    :id="id"
    :type="type"
    :name="name"
    :class="[
      inputCustomClass,
      type === 'checkbox' ? 'a-input-checkbox' : 'a-input',
    ]"
    :placeholder="placeholder"
    :disabled="disabled"
    :checked="ckboxChecked"
    autocomplete="off"
  />
</template>

<script setup lang="ts">
defineProps<{
  id?: string;
  type: "text" | "email" | "password" | "checkbox";
  name?: string;
  inputCustomClass?: string;
  placeholder?: string;
  disabled?: boolean;
  ckboxChecked?: boolean;
}>();
</script>
