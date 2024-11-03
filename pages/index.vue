<script setup lang="ts">
import CircleProgressbar from "~/components/common/CircleProgressbar.vue";
import UButton from "~/components/uikit/UButton.vue";

import { ProgressbarTheme } from "~/const/progressbar";
import { ButtonTheme } from "~/const";

const MAX_PERCENT = 100;

const theme = ref<ProgressbarTheme>(ProgressbarTheme.Default);
const firstPercent = ref(0);
const firstSpeed = ref(50);

let intervalId: NodeJS.Timeout | undefined = undefined;

const cleatTimer = () => {
  clearInterval(intervalId);
  intervalId = undefined;
  firstPercent.value = 0;
};

const counter = () => {
  if (firstPercent.value > MAX_PERCENT - 1) {
    cleatTimer();
    return;
  }
  firstPercent.value += 1;
};

const handleStartProgressbar = () => {
  if (firstPercent.value > MAX_PERCENT - 1) {
    firstPercent.value = 0;
  }

  intervalId = setInterval(counter, firstSpeed.value);
};

const handleViewButtonClick = () => {
  theme.value =
    theme.value === ProgressbarTheme.Default
      ? ProgressbarTheme.Dashboard
      : ProgressbarTheme.Default;
};
</script>

<template>
  <div class="home-page">
    <h2 class="home-page__title">Прогрессбар</h2>

    <div class="home-page__content">
      <div class="home-page__progressbar-actions progressbar-actions">
        <UButton
          class="progressbar-actions__start-button"
          :disabled="!!intervalId"
          type="button"
          @click="handleStartProgressbar"
        >
          Запустить таймер
        </UButton>
        <UButton
          class="progressbar-actions__view-button"
          :theme="ButtonTheme.Outline"
          type="button"
          @click="handleViewButtonClick"
        >
          Изменить вид
        </UButton>
      </div>

      <div class="home-page__progressbar-wrapper">
        <CircleProgressbar
          class="home-page__progressbar"
          :theme="theme"
          :percent="firstPercent"
          :speed="firstSpeed"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  .home-page__title {
    font-size: var(--size-32);
    color: var(--text-color);
    border-bottom: 1px solid var(--accent-gray);
    margin: 0 0 40px 0;
    padding-bottom: 30px;
    padding-left: 10px;
  }

  .home-page__content {
    display: flex;
    flex-direction: column;
  }

  .home-page__progressbar-wrapper {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    order: 1;
  }

  .home-page__progressbar {
    max-width: 300px;
  }

  .progressbar-actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    order: 2;

    .progressbar-actions__start-button {
      margin-bottom: 20px;
    }
  }
}

@media screen and (min-width: 768px) {
  .home-page {
    margin-left: auto;
    margin-right: auto;

    .home-page__content {
      flex-direction: row;
      max-width: 1170px;
      margin-right: auto;
      margin-left: auto;
      justify-content: center;
    }

    .home-page__progressbar-wrapper {
      order: unset;
      width: 300px;
    }
    .progressbar-actions {
      flex-direction: column;
      justify-content: center;
      order: unset;
      max-width: 350px;
      flex-grow: 1;
      margin-right: 90px;
    }
  }
}
</style>
