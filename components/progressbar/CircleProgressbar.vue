<script setup lang="ts">
import SuccessIcon from "~/components/icons/SuccessIcon.vue";
import ErrorIcon from "~/components/icons/ErrorIcon.vue";
import WarningIcon from "~/components/icons/WarningIcon.vue";

import {
  ProgressbarStatus,
  ProgressbarStatusColor,
  ProgressbarTheme,
} from "~/const/progressbar";

const props = withDefaults(
  defineProps<{
    percent?: number;
    finishPercent: number;
    theme: ProgressbarTheme;
    speed?: number;
    status: ProgressbarStatus;
  }>(),
  {
    percent: 0,
    speed: 100,
  },
);

const speedMs = computed(() => `${props.speed}ms`);
const speedColor = computed(() => `${props.speed * props.finishPercent}ms`);
const statusColor = computed(() => ProgressbarStatusColor[props.status]);

const circumferenceLength = Math.round(2 * Math.PI * 40);
const progressOffset = computed(() =>
  Math.round(circumferenceLength * ((100 - props.percent) / 100)),
);

const statusIcon = computed(() => {
  switch (props.status) {
    case ProgressbarStatus.Success:
      return SuccessIcon;
    case ProgressbarStatus.Error:
      return ErrorIcon;
    case ProgressbarStatus.Warning:
      return WarningIcon;
  }
});
</script>

<template>
  <div class="circle-progressbar">
    <div class="circle-progressbar__progress-result progress-result">
      <span
        class="progress-result__text"
        :class="{ 'progress-result__text--hide': percent >= finishPercent }"
        >{{ percent }}%</span
      >
      <component
        :is="statusIcon"
        :class="[
          `progress-result__icon progress-result__icon--${status}`,
          { 'progress-result__icon--hide': percent < finishPercent },
        ]"
      />
    </div>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="circle-progressbar__svg"
      :class="{
        'circle-progressbar__svg--animate':
          percent > 0 && percent < finishPercent,
      }"
    >
      <circle
        class="circle-progressbar__gray"
        r="40"
        cx="50"
        cy="50"
        stroke="currentColor"
        fill="transparent"
        stroke-width="3"
      />
      <circle
        class="circle-progressbar__gradient"
        r="40"
        cx="50"
        cy="50"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        :style="{
          transform:
            theme === ProgressbarTheme.Default
              ? 'rotate(-90deg)'
              : 'rotate(90deg)',
          color: percent < finishPercent ? '#1b84ff' : statusColor,
        }"
        :stroke-dasharray="circumferenceLength"
        :stroke-dashoffset="progressOffset"
      ></circle>
    </svg>
  </div>
</template>

<style scoped>
.circle-progressbar {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .circle-progressbar__progress-result {
    position: absolute;
  }

  .progress-result {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    line-height: 1rem;
    color: var(--text-gray);

    .progress-result__text {
      opacity: 1;
      transition: opacity ease-in-out 0.5s;
    }

    .progress-result__text.progress-result__text--hide {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      white-space: nowrap;
      opacity: 0;
    }

    .progress-result__icon {
      opacity: 1;
      width: 30px;
      height: 30px;
      transition: opacity ease-in-out 0.3s;
    }

    .progress-result__icon.progress-result__icon--hide {
      opacity: 0;
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      white-space: nowrap;
    }

    .progress-result__icon--success {
      color: var(--accent-green);
    }

    .progress-result__icon--error {
      color: var(--accent-red);
    }

    .progress-result__icon--warning {
      color: var(--accent-yellow);
    }
  }

  .circle-progressbar__svg {
    z-index: 1;

    &.circle-progressbar__svg--animate {
      .circle-progressbar__gradient {
        animation: change-color ease-in-out v-bind(speedColor);
      }
    }

    .circle-progressbar__gray {
      color: #f6f7fa;
    }

    .circle-progressbar__gradient {
      color: var(--accent-blue);
      transform-origin: center;
      transition: stroke-dashoffset ease-in v-bind(speedMs);
    }
  }
}

@keyframes change-color {
  100% {
    color: v-bind(statusColor);
  }
}
</style>
