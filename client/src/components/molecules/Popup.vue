<template>
  <div
    :v-if="popupCondition"
    class="absolute top-0 origin-center bg-white h-64 w-full px-4 border border-black rounded flex flex-col justify-around items-center shadow-md z-50"
  >
    <!-- <template #title></template> -->
    <div class="font-bold" id="title">
      <slot name="title" />
    </div>
    <div id="body">
      <slot />
    </div>
    <div class="flex flex-col w-full" id="button_group">
      <slot name="button_group" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  popupCondition?: boolean;
}>();
</script>
