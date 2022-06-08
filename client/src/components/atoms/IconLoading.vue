<template>
  <Icon
    type="solid transform"
    title="Patience..."
    :d="[
      {
        path: icons.waiting.solid.path,
        fill: icons.waiting.solid.fill[waitingFillIndex],
      },
    ]"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import icons from "../../assets/icons";
import { Icon } from "../../components/atoms";

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const number = randomNumber(1, 4) as 1 | 2 | 3 | 4;

const waitingFillIndex: Ref<1 | 2 | 3 | 4> = ref<1 | 2 | 3 | 4>(number);
</script>
