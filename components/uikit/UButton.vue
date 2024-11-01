<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit";
  }>(),
  {
    type: "button",
  },
);
</script>

<template>
  <button class="u-button" :type="type">
    <slot />
  </button>
</template>

<style scoped>
.u-button {
  font-size: var(--size-16);
  line-height: var(--size-24);
  width: 100%;
  padding: 18px 0;
  border: none;
  border-radius: 10px;
  background-color: var(--accent-blue);
  color: var(--text-color-inverse);
  cursor: pointer;
  transition: background-color ease-in-out 0.1s;

  &:hover {
    background-color: var(--accent-blue-hover);
  }
}
</style>
