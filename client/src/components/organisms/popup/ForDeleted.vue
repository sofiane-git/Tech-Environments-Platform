<template>
  <Popup>
    <template #title>
      <Text tag="h3">
        Êtes vous bien sûr de vouloir supprimer {{ envName }}
      </Text>
    </template>
    <template #default>
      <Text tag="p" class="text-center">
        Après confirmation, un message sera envoyé <br />
        sur le canal Slack
        <Text
          class="bg-red-50 px-1 a-navlink cursor-pointer"
          tag="a"
          :href="href"
          target="_blank"
          >#tech-environments-platform</Text
        >
      </Text>
    </template>
    <template #button_group>
      <slot name="button_group" />
    </template>
  </Popup>
</template>

<script setup lang="ts">
import { Text } from "../../atoms";
import { Popup } from "../../molecules";
import { ButtonGroup } from "../../organisms";

defineProps<{
  isFree: boolean;
  envName: string;
  href: string;
}>();
</script>
