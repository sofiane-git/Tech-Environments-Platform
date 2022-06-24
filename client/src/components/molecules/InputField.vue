<template>
  <div class="py-1 relative w-full flex items-center group">
    <Text
      tag="label"
      :for="id"
      :label-custom-class="onFocus ? 'opacity-100' : 'opacity-0'"
      >{{ labelContent }}</Text
    >
    <Input
      :type="inputType"
      :id="id"
      :placeholder="placeholder ? placeholder : labelContent"
      :name="name"
      :disabled="disabled"
      :input-custom-class="inputCustomClass"
      v-on:focus="onFocus = true"
      v-on:focusout="
        $event.target?.value.trim()
          ? (onFocus = true)
          : ((onFocus = false), ($event.target.value = ''))
      "
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <div
      @click="togglePasswordVisibility"
      class="absolute bottom-[-5px] right-[-9px] cursor-pointer group-hover:drop-shadow hover:drop-shadow hover:scale-105"
      v-if="inputTypePassword"
    >
      <Icon
        type="solid"
        :d="
          passwordIsVisible
            ? [
                { path: icons.eye_close.solid.path[1] },
                { path: icons.eye_close.solid.path[2] },
              ]
            : [
                { path: icons.eye_open.solid.path[1] },
                { path: icons.eye_open.solid.path[2] },
              ]
        "
        :title="
          passwordIsVisible ? 'Cacher mot de passe' : 'Afficher mot de passe'
        "
        custom-class="fill-slate-600"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Text, Input, Icon } from "../atoms";
import icons from "../../assets/icons";

const props = defineProps<{
  modelValue?: any;
  id?: string;
  placeholder?: string;
  name?: string;
  labelContent: string;
  inputType: "text" | "email" | "password";
  inputCustomClass?: string;
  disabled?: boolean;
}>();

// SHOW ICON (EYE) IF TYPE IS PASSWORD
const inputTypePassword = ref(false);
if (props.inputType === "password") {
  inputTypePassword.value = true;
}

// LABEL ANIMATION
const onFocus = ref(false);

// INPUT TYPE AND VISIBILITY VALUE FOR PASSWORD MANAGEMENT
const getInputType = ref(props.inputType);
const setInputType = (type: "text" | "password") => {
  getInputType.value = type;
};

const passwordIsVisible = ref(false);

const togglePasswordVisibility = () => {
  passwordIsVisible.value = !passwordIsVisible.value;
  passwordIsVisible.value ? setInputType("text") : setInputType("password");
};
</script>
