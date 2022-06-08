<template>
  <Button
    :customButtonClass="customButtonClass"
    :edit-disabled="editDisabled"
    :type="buttonType"
    :content="buttonContent"
  >
    <Icon
      :type="iconType"
      :d="d"
      :custom-class="`mr-2 ${customIconClass}`"
      :title="title"
    />
  </Button>
</template>

<script setup lang="ts">
import { Button, Icon } from "../../components/atoms";

defineProps<{
  buttonType?: "submit" | "button";
  iconType: "solid" | "outline";
  buttonContent: string;
  d: { path: string; fill?: string }[];
  customButtonClass?: string;
  customIconClass?: string;
  editDisabled?: boolean;
  title: string;
}>();
</script>
