<script setup lang="ts">
import UButton from "~/components/uikit/UButton.vue";
import CircleProgressbar from "~/components/progressbar/CircleProgressbar.vue";

import { type ProgressbarStatus, ProgressbarTheme } from "~/const/progressbar";

defineProps<{
  theme: ProgressbarTheme;
  status: ProgressbarStatus;
  percent: number;
  disabled: boolean;
  speed: number;
}>();

defineEmits<{
  (e: "start"): void;
}>();
</script>

<template>
  <div class="progressbar-preview">
    <div class="progressbar-preview__progressbar-actions progressbar-actions">
      <UButton
        class="progressbar-actions__start-button"
        :disabled="disabled"
        type="button"
        @click="$emit('start')"
      >
        Запустить таймер
      </UButton>
    </div>

    <div class="progressbar-preview__progressbar-wrapper">
      <CircleProgressbar
        class="progressbar-preview__progressbar"
        :theme="theme"
        :status="status"
        :percent="percent"
        :speed="speed"
      />
    </div>
  </div>
</template>

<style scoped>
.progressbar-preview {
  display: flex;
  flex-direction: column;

  .progressbar-preview__progressbar-wrapper {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    order: 1;
  }

  .progressbar-preview__progressbar {
    max-width: 300px;
  }

  .progressbar-actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    order: 2;

    .progressbar-actions__start-button {
      max-width: 450px;
    }
  }
}

@media screen and (min-width: 768px) {
  .progressbar-preview {
    flex-direction: row;
    margin-right: auto;
    margin-left: auto;
    justify-content: center;

    .progressbar-preview__progressbar-wrapper {
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
