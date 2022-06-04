<template>
  <div>
    <input
      type="text"
      :placeholder="placeholderValue"
      class="inputForm"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"

    />
    <span class="errorMessage block p-2 pt-0 text-left w-3/4 mx-auto mb-2">
      {{error}} 
    </span>
  </div>

</template>
<script setup>
// import { ref } from 'vue';
  const props = defineProps({
    placeholderValue: String,
    modelValue: String,
    error: String
  })
  // const emit = defineEmits(['update:modelValue'])
  // const vmodelValue = ref(props.inputName)
</script>