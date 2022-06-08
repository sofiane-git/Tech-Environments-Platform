<template>
  <div class="flex items-center w-full relative">
    <input-field
      :id="inputId"
      :label-content="labelName"
      :input-type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <div
      class="absolute bottom-[-3.5px] right-[-9.5px] bg-white rounded-full px-0.5"
      @click="handleInputType(inputType)"
    >
      <Icon
        type="solid"
        :custom-class="[
          'o-password-input-icon',
          inputType === 'password' ? 'fill-blue-400 ' : 'fill-red-400',
        ]"
        :title="
          inputType === 'password'
            ? 'Afficher mot de passe'
            : 'Cacher mot de passe'
        "
        :d="
          inputType === 'password'
            ? [
                { path: icons.eye_open.solid.path[1] },
                { path: icons.eye_open.solid.path[2] },
              ]
            : [
                { path: icons.eye_close.solid.path[1] },
                { path: icons.eye_close.solid.path[2] },
              ]
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import icons from "../../assets/icons";
import { InputField } from "../molecules";
import { Icon } from "../atoms";

defineProps<{
  inputId: "password" | "password-confirmation";
  labelName: "Mot de passe" | "Confirmation mot de passe";
  placeholder: "Votre mot de passe" | "Confirmer votre mot de passe";
  modelValue: string;
}>();

const inputType: Ref<"password" | "text"> = ref<"password" | "text">(
  "password"
);

const handleInputType = (typeToChange: string) => {
  typeToChange === "password"
    ? (inputType.value = "text")
    : (inputType.value = "password");
  console.log("typeToChange | ", inputType.value);
};
</script>
