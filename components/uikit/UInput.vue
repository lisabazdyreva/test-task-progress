<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    placeholder?: string;
    modelValue: string;
    type?: "number" | "text" | "password";
  }>(),
  {},
);
</script>

<template>
  <label class="u-input">
    <span class="u-input__placeholder">{{ label }}</span>
    <input class="u-input__input" :placeholder="placeholder" :type="type" name="name" value="123" />
  </label>
</template>

<style scoped>
.u-input {
  position: relative;
  display: flex;
  flex-direction: column;

  .u-input__placeholder {
    font-size: var(--size-12);
    color: var( --text-gray);
    position: absolute;
    left: 20px;
    top: 10px;
  }

  .u-input__input {
    font-family: inherit;
    font-size: var(--size-16);
    border-radius: 10px;
    padding: 26px 20px 10px;
    border: 1px solid var(--accent-gray);
    outline: none;
  }

  .u-input__input:focus {
    border-color: var(--accent-blue);
  }
}
</style>
