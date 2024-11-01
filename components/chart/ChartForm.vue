<script setup lang="ts">
import UInput from "~/components/uikit/UInput.vue";
import UButton from "~/components/uikit/UButton.vue";

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
    percent: percent.value,
    id: props.data.id,
  });
};

const show = () => {
  console.log("title", title.value);
  console.log("color", color.value);
  console.log("percent", Number(percent.value));
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
      v-model="color"
      label="Цвет"
      placeholder="Цвет"
      type="text"
    />

    <UButton :disabled="!title || !color || !percent" type="submit">
      {{ isEditMode ? "Cохранить изменения" : "Добавить сектор" }}
    </UButton>
    <!--    <button type="button" @click="show">Show</button> todo lisa remove-->
  </form>
</template>

<style scoped>
.chart-form {
  display: flex;
  flex-direction: column;
  /*width: 100%; max-*/
  width: 390px;

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
}
</style>
