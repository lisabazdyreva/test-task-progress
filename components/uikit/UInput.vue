<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
    placeholder?: string;
    modelValue?: string;
    disabled?: boolean;
    type?: "number" | "text" | "password";
    max?: number;
    min?: number;
    inputmode?: "text" | "numeric";
  }>(),
  {
    label: "",
    placeholder: "",
    disabled: false,
    type: "text",
    inputmode: "text",
  },
);

const emits = defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const onInput = (evt: Event) => {
  if (props?.disabled) {
    return;
  }
  const target = evt.target as HTMLInputElement;
  emits("update:model-value", target.value);
};
</script>

<template>
  <label class="u-input">
    <span class="u-input__label">{{ label }}</span>
    <input
      class="u-input__input"
      :placeholder="placeholder"
      :type="type"
      :inputmode="inputmode"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
    />
  </label>
</template>

<style scoped>
.u-input {
  position: relative;
  display: flex;
  flex-direction: column;

  .u-input__label {
    font-size: var(--size-12);
    color: var(--text-gray);
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

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    -moz-appearance: textfield;
  }

  .u-input__input::placeholder {
    color: var(--text-gray);
    font-size: var(--size-12);
  }

  .u-input__input:focus {
    border-color: var(--accent-blue);
  }
}
</style>
