<template>
  <li
    class="text-center p-2 cursor-pointer text-sm shadow-sm hover:bg-gray-50 hover:shadow-inner"
  >
    <Text tag="span"> {{ itemProfil.name }} </Text>
  </li>
</template>

<script setup lang="ts">
import { Text } from "../atoms";

interface ItemProfil {
  name: string;
}

defineProps<{
  itemProfil: any;
}>();
</script>
