<script setup lang="ts">
import USelect from "~/components/uikit/USelect.vue";
import UInput from "~/components/uikit/UInput.vue";

import {
  ProgressbarSpeed,
  ProgressbarSpeedLabel,
  ProgressbarStatus,
  ProgressbarStatusLabel,
  ProgressbarTheme,
  ProgressbarThemeLabel,
} from "~/const/progressbar";

const props = defineProps<{
  status: ProgressbarStatus;
  speed: ProgressbarSpeed;
  theme: ProgressbarTheme;
  disabled: boolean;
  maxPercent: number;
}>();

const emits = defineEmits<{
  (e: "change-status", status: ProgressbarStatus): void;
  (e: "change-speed", speed: ProgressbarSpeed): void;
  (e: "change-theme", theme: ProgressbarTheme): void;
  (e: "change-percent", percent: number): void;
}>();

const statuses = Object.values(ProgressbarStatus);

const handleFinishStatusChange = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value;

  if (props.status === value) {
    return;
  }

  emits("change-status", value as ProgressbarStatus);
};

const handleSpeedChange = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value;

  if (props.speed === value) {
    return;
  }

  emits("change-speed", value as ProgressbarSpeed);
};

const handleThemeChange = (evt: Event) => {
  const value = (evt.target as HTMLInputElement).value;

  if (props.theme === value) {
    return;
  }

  emits("change-theme", value as ProgressbarTheme);
};
</script>

<template>
  <div class="progressbar-settings">
    <h3 class="progressbar-settings__title">Настройки</h3>

    <div class="progressbar-settings__settings-list settings-list">
      <USelect
        class="settings-list__status"
        :model-value="status"
        :options="statuses"
        :labels="ProgressbarStatusLabel"
        :disabled="disabled"
        name="Результат выполнения"
        @select="handleFinishStatusChange"
      />

      <USelect
        class="settings-list__speed"
        :model-value="speed"
        :options="Object.values(ProgressbarSpeed)"
        :labels="ProgressbarSpeedLabel"
        :disabled="disabled"
        name="Скорость выполнения"
        @select="handleSpeedChange"
      />

      <USelect
        class="settings-list__theme"
        :model-value="theme"
        :options="Object.values(ProgressbarTheme)"
        :labels="ProgressbarThemeLabel"
        name="Внешний вид"
        :disabled="disabled"
        @select="handleThemeChange"
      />

      <UInput
        class="settings-list__percent"
        :model-value="String(maxPercent)"
        type="number"
        label="Процент остановки"
        :disabled="disabled"
        @update:model-value="
          (value: string) => $emit('change-percent', Number(value))
        "
      />
    </div>
  </div>
</template>

<style scoped>
.progressbar-settings {
  .progressbar-settings__title {
    font-size: var(--size-24);
    color: var(--text-color);
    border-bottom: 1px solid var(--accent-gray);
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .settings-list {
    display: grid;
    align-items: center;
    gap: 20px;
    max-width: 450px;
    margin: 0 auto 20px;
  }
}

@media screen and (min-width: 768px) {
  .progressbar-settings {
    .settings-list {
      grid-template-columns: repeat(3, 1fr);
      max-width: unset;

      .settings-list__percent {
        grid-column: 1/-1;
      }
    }
  }
}
</style>
