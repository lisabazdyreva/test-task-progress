<script setup lang="ts">
import { GetColorName } from "hex-color-to-color-name";

import UInput from "~/components/uikit/UInput.vue";
import UButton from "~/components/uikit/UButton.vue";
import ColorPickerInput from "~/components/common/ColorPickerInput.vue";

import type { ISegment } from "~/types/chart";

const props = defineProps<{
  data: ISegment;
  isEditMode: boolean;
}>();

const emits = defineEmits<{
  (e: "submit", data: ISegment): void;
}>();

const title = ref<string>(props.data.title);
const color = ref<string>(props.data.color);
const percent = ref<string>(props.data.percent.toString());
const errorMessage = ref<string | null>(null);

const colorName = computed(() => GetColorName(color.value.slice(0, 7)));

const checkIsTitleValid = (value: string) => {
  if (value?.length >= 1) {
    return true;
  }

  errorMessage.value = "Введите наименование сегмента";
  return false;
};

const checkIsPercentValid = (value: string) => {
  if (Number(value) > 0 && Number(value) <= 100) {
    return true;
  }

  errorMessage.value = "Введите значение в процентах";
  return false;
};

const checkIsColorValid = (value: string) => {
  if (value?.length >= 1) {
    return true;
  }

  errorMessage.value = "Введите цвет";
  return false;
};

const handleChartFormSubmit = () => {
  errorMessage.value = null;

  if (!checkIsTitleValid(title.value)) {
    return;
  }

  if (!checkIsPercentValid(percent.value)) {
    return;
  }

  if (!checkIsColorValid(color.value)) {
    return;
  }

  emits("submit", {
    title: title.value,
    color: color.value,
    percent: Number(percent.value),
    id: props.data.id,
  });
};

const handleColorChange = (value: string) => {
  color.value = value;
};
</script>

<template>
  <form class="chart-form" @submit.prevent="handleChartFormSubmit">
    <div class="chart-form__header">
      <h3 class="chart-form__title">Добавление сектора</h3>
      <p class="chart-form__error-caption">
        {{ errorMessage }}
      </p>
    </div>

    <div class="chart-form__content">
      <UInput
        class="chart-form__input"
        v-model="title"
        placeholder="Наименование"
        label="Наименование"
        type="text"
      />

      <UInput
        class="chart-form__input"
        v-model="percent"
        label="Значение"
        placeholder="Значение"
        type="number"
      />

      <UInput
        class="chart-form__input"
        :model-value="colorName"
        label="Цвет"
        placeholder="Цвет"
        type="text"
      />

      <ColorPickerInput
        class="chart-form__color-picker"
        :color="color"
        @color-change="handleColorChange"
      />

      <UButton :disabled="!title || !color || !percent" type="submit">
        {{ isEditMode ? "Сохранить изменения" : "Добавить сектор" }}
      </UButton>
    </div>
  </form>
</template>

<style scoped>
.chart-form {
  display: flex;
  flex-direction: column;

  .chart-form__content {
    max-height: calc(100vh - 45px - 60px);
    max-height: calc(100svh - 45px - 60px);
    overflow: auto;
    padding-right: var(--modal-pd);
  }

  .chart-form__header {
    position: relative;
  }

  .chart-form__title {
    font-size: var(--size-20);
    margin: 0 0 20px 0;
  }

  .chart-form__error-caption {
    position: absolute;
    bottom: -10px;
    font-size: var(--size-12);
    color: var(--accent-red);
  }

  .chart-form__input {
    margin-bottom: 20px;
  }

  .chart-form__input:last-child {
    margin-bottom: 0;
  }

  .chart-form__color-picker {
    margin-bottom: 20px;
  }
}
</style>
