<template>
  <div class="flex justify-around border-2 border-black w-full h-24">
    <p>{{ envTest.name }}</p>
    <div>
      <p>{{ envTest.isFree }}</p>
<!--      <p>par {{ user.lastName }}, le {{ date.completeDate }} à {{ date.hour }}</p>-->
    </div>
    <button @click="emit('toggleEnv', envTest.id)">
      Utiliser
    </button>
  </div>
</template>

<script setup>
  const envTest = {
    name: String,
    isFree: Boolean,
    id: String
  }
  const emit = defineEmits(['toggleEnv'])
</script>