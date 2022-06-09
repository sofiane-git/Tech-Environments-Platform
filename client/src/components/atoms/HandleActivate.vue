<template>
  <div
    class="w-9 h-5 px-[0.1] rounded-xl grid items-center shadow-inner group cursor-pointer shadow-sm hover:shadow"
    :class="activate ? 'bg-green-400 ' : 'bg-gray-200 '"
  >
    <div
      class="w-[1.2rem] h-[1.2rem] bg-white rounded-full transition-all"
      :class="
        activate ? 'justify-self-end' : 'justify-self-start shadow-gray-400'
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activate: boolean;
}>();
</script>
