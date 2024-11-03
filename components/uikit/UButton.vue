<script setup lang="ts">
import { ButtonTheme } from "~/const";

withDefaults(
  defineProps<{
    type?: "button" | "submit";
    disabled?: boolean;
    theme?: ButtonTheme;
  }>(),
  {
    type: "button",
    disabled: false,
    theme: ButtonTheme.Default,
  },
);
</script>

<template>
  <button
    class="u-button"
    :class="{ 'u-button--outline': theme === ButtonTheme.Outline }"
    :type="type"
    :disabled="disabled"
  >
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

  &:disabled {
    cursor: not-allowed;
    background-color: var(--accent-gray);
  }
}

.u-button.u-button--outline {
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--accent-blue);
  padding: 16px 0;

  &:hover {
    background-color: #00000020;
  }
}
</style>
