<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  options: Array<string>;
  labels: Record<string, string>;
  name: string;
  disabled: boolean;
}>();

const emits = defineEmits<{
  (e: "select", evt: Event): void;
}>();

const handleSelectChange = (evt: Event) => {
  if (props?.disabled) {
    return;
  }
  emits("select", evt);
};
</script>

<template>
  <div class="u-select">
    <label class="u-select__label" :for="name">{{ `${name}:` }}</label>
    <select
      class="u-select__select"
      :id="name"
      :disabled="disabled"
      :value="modelValue"
      :name="name"
      @change="handleSelectChange"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ labels[option] }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.u-select {
  .u-select__label {
    display: block;
    font-size: var(--size-16);
    line-height: var(--size-20);
    color: var(--text-gray);
    margin-bottom: 5px;
  }

  .u-select__select {
    font-size: var(--size-16);
    line-height: var(--size-20);
    min-width: 200px;
    width: 100%;
    padding: 12px 20px;
    margin: 0;
    border: 1px solid var(--accent-gray);
    border-radius: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%);
    background-position:
      calc(100% - 20px) calc(1em + 4px),
      calc(100% - 15px) calc(1em + 4px);
    background-size:
      5px 5px,
      5px 5px,
      1.5em 1.5em;
    background-repeat: no-repeat;

    &:focus {
      outline-color: var(--accent-blue);
    }
  }
}
</style>
