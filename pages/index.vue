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

const currentPercent = ref(0);
const maxPercent = ref(MAX_PERCENT);

const selectedStatus = ref(ProgressbarStatus.Success);

const currentSpeed = ref(50);
const selectedSpeed = ref(ProgressbarSpeed.High);

const intervalId = ref<NodeJS.Timeout | undefined>();

const counter = () => {
  if (currentPercent.value > maxPercent.value - 1) {
    clearInterval(intervalId.value);
    intervalId.value = undefined;
    return;
  }
  currentPercent.value += 1;
};

const startProgressbar = () => {
  if (currentPercent.value > maxPercent.value - 1) {
    currentPercent.value = 0;
  }

  intervalId.value = setInterval(counter, currentSpeed.value);
};

const changeTheme = (selectedTheme: ProgressbarTheme) => {
  theme.value = selectedTheme;
  currentPercent.value = 0;
};

const changeSpeed = (speed: ProgressbarSpeed) => {
  selectedSpeed.value = speed;
  currentSpeed.value = ProgressbarSpeedMs[speed as ProgressbarSpeed];
  currentPercent.value = 0;
};

const changeStatus = (status: ProgressbarStatus) => {
  selectedStatus.value = status;
  currentPercent.value = 0;
};

const changePercent = (value: number) => {
  maxPercent.value = value;
  currentPercent.value = 0;
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
      :percent="currentPercent"
      :finish-percent="maxPercent"
      @start="startProgressbar"
    />

    <ProgressbarSettings
      :disabled="!!intervalId"
      :speed="selectedSpeed"
      :status="selectedStatus"
      :max-percent="maxPercent"
      :theme="theme"
      @change-speed="changeSpeed"
      @change-status="changeStatus"
      @change-theme="changeTheme"
      @change-percent="changePercent"
    />
  </div>
</template>

<style scoped>
.home-page {
  margin-bottom: 20px;
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
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 1170px;
  }
}
</style>
