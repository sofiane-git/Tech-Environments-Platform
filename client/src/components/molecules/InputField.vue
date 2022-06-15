<template>
  <div class="py-1 relative w-full">
    <Text
      tag="label"
      :for="id"
      :label-custom-class="onFocus ? 'opacity-100' : 'opacity-0'"
      >{{ labelContent }}</Text
    >
    <Input
      :type="inputType"
      :id="id"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :input-custom-class="inputCustomClass"
      v-on:focus="onFocus = true"
      v-on:focusout="
        $event.target?.value
          ? (onFocus = true)
          : ((onFocus = false), ($event.target.value = ''))
      "
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Text, Input } from "../atoms";

defineProps<{
  modelValue?: any;
  id?: string;
  placeholder?: string;
  name?: string;
  labelContent: string | null;
  inputType: "text" | "email" | "password";
  inputCustomClass?: string;
  disabled?: boolean;
}>();
const onFocus = ref(false);
</script>
