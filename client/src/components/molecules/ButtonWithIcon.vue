<template>
  <Button
    :customButtonClass="customButtonClass"
    :edit-disabled="editDisabled"
    :type="buttonType"
    class="p-0 m-0 border-0 w-5 hover:shadow-none group"
  >
    <Icon
      :type="iconType"
      :d="d"
      :custom-class="`${customIconClass}`"
      :title="title"
      class="group-hover:text-slate-300 p-0 m-0"
    />
  </Button>
</template>

<script setup lang="ts">
import { Button, Icon } from "../../components/atoms";

defineProps<{
  buttonType?: "submit";
  iconType: "solid" | "outline";
  d: { path: string; fill?: string }[];
  customButtonClass?: string;
  customIconClass?: string;
  editDisabled?: boolean;
  title: string;
}>();
</script>
