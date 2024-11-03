<script setup lang="ts">
import ProgressbarPreview from "~/components/progressbar/ProgressbarPreview.vue";
import ProgressbarSettings from "~/components/progressbar/ProgressbarSettings.vue";

import {
  ProgressbarSpeed,
  ProgressbarSpeedMs,
  ProgressbarStatus,
  ProgressbarTheme,
} from "~/const/progressbar";

const MAX_PERCENT = 100;

const theme = ref<ProgressbarTheme>(ProgressbarTheme.Default);
const firstPercent = ref(0);

const selectedStatus = ref(ProgressbarStatus.Success);

const currentSpeed = ref(50);
const selectedSpeed = ref(ProgressbarSpeed.High);

const intervalId = ref<NodeJS.Timeout | undefined>();

const counter = () => {
  if (firstPercent.value > MAX_PERCENT - 1) {
    clearInterval(intervalId.value);
    intervalId.value = undefined;
    return;
  }
  firstPercent.value += 1;
};

const startProgressbar = () => {
  if (firstPercent.value > MAX_PERCENT - 1) {
    firstPercent.value = 0;
  }

  intervalId.value = setInterval(counter, currentSpeed.value);
};

const changeTheme = (selectedTheme: ProgressbarTheme) => {
  theme.value = selectedTheme;
  firstPercent.value = 0;
};

const changeSpeed = (speed: ProgressbarSpeed) => {
  selectedSpeed.value = speed;
  currentSpeed.value = ProgressbarSpeedMs[speed as ProgressbarSpeed];
  firstPercent.value = 0;
};

const changeStatus = (status: ProgressbarStatus) => {
  selectedStatus.value = status;
  firstPercent.value = 0;
};
</script>

<template>
  <div class="home-page">
    <h2 class="home-page__title">Прогрессбар</h2>

    <ProgressbarPreview
      class="home-page__preview"
      :disabled="!!intervalId"
      :speed="currentSpeed"
      :status="selectedStatus"
      :theme="theme"
      :percent="firstPercent"
      @start="startProgressbar"
    />

    <ProgressbarSettings
      :disabled="!!intervalId"
      :speed="selectedSpeed"
      :status="selectedStatus"
      :theme="theme"
      @change-speed="changeSpeed"
      @change-status="changeStatus"
      @change-theme="changeTheme"
    />
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

  .home-page__preview {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 768px) {
  .home-page {
    margin-left: auto;
    margin-right: auto;
    max-width: 1170px;
  }
}
</style>
