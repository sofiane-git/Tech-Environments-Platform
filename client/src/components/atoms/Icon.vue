<template>
  <!-- SVG HEROICON TYPE OUTLINE -->
  <svg
    :type="type"
    v-if="type === 'outline'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="h-6 w-6"
    stroke="currentColor"
    stroke-width="2"
    :class="customClass"
  >
    <title>{{ title }}</title>
    <g v-for="(elem, index) in d" :key="index">
      <path stroke-linecap="round" stroke-linejoin="round" :d="elem.path" />
    </g>
  </svg>

  <!-- SVG HEROICON TYPE SOLID -->
  <svg
    :type="type"
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    :viewBox="type === 'solid transform' ? '0 0 128 128' : '0 0 20 20'"
    :class="customClass"
  >
    <title>{{ title }}</title>
    <g>
      <path
        v-for="(elem, index) in d"
        :key="index"
        fill-rule="evenodd"
        clip-rule="evenodd"
        :d="elem.path"
        :class="elem.fill"
      />
      <animateTransform
        v-if="type === 'solid transform'"
        attributeName="transform"
        type="rotate"
        from="0 64 64"
        to="90 64 64"
        dur="1000ms"
        repeatCount="indefinite"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  d: { path: string; fill?: string }[];
  title: string;
  type: "outline" | "solid" | "solid transform";
  customClass?: string | string[];
  customFill?: string[];
}>();
</script>
