<template>
  <div
    class="w-9 h-5 rounded-xl grid items-center group cursor-pointer hover:shadow-sm transition-all"
    :class="
      activate
        ? 'justify-self-start shadow-[inset_6px_0px_7px_0_rgb(0,0,0,0.05)] bg-green-400 '
        : 'bg-gray-200 justify-self-end shadow-[inset_-6px_0px_7px_0_rgb(0,0,0,0.05)]'
    "
  >
    <div
      class="w-[1.1rem] h-[1.1rem] mb-[0.3px] bg-white rounded-full transition-all shadow-slate-300"
      :class="
        activate
          ? 'justify-self-end shadow-[inset_-6px_0px_7px_0_rgb(0,0,0,0.05)]'
          : 'justify-self-start shadow-[inset_6px_0px_8px_0_rgb(0,0,0,0.05)]'
      "
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activate: boolean;
}>();
</script>
