<script setup lang="ts">
import UInput from "~/components/uikit/UInput.vue";
import UButton from '~/components/uikit/UButton.vue';

const handleChartFormSubmit = () => {
  // todo lisa
};
</script>

<template>
  <form class="chart-form" @submit.prevent="handleChartFormSubmit">
    <h3 class="chart-form__title">Добавление сектора</h3>

    <UInput
      class="chart-form__input"
      model-value="123"
      placeholder="Наименование"
      label="Наименование"
      type="text"
    />
    <UInput
      class="chart-form__input"
      model-value="70"
      label="Значение"
      placeholder="Значение"
      type="number"
    />

    <UInput
      class="chart-form__input"
      model-value="70"
      label="Цвет"
      placeholder="Цвет"
      type="number"
    />

    <UButton type="submit">
      Добавить сектор
    </UButton>
  </form>
</template>

<style scoped>
.chart-form {
  display: flex;
  flex-direction: column;
  /*width: 100%; max-*/
  width: 390px;


  .chart-form__title {
    font-size: var(--size-20);
    margin: 0 0 20px 0;
  }

  .chart-form__input {
    margin-bottom: 20px;
  }

  .chart-form__input:last-child {
    margin-bottom: 0;
  }
}
</style>
