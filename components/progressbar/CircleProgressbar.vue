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
const speedColor = computed(() => `${props.speed * 100}ms`);
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
      <span v-if="percent < 100" class="progress-result__text"
        >{{ percent }}%</span
      >
      <template v-else>
        <component
          :is="statusIcon"
          :class="[`progress-result__icon progress-result__icon--${status}`]"
        />
      </template>
    </div>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="circle-progressbar__svg"
      :class="{
        'circle-progressbar__svg--animate': percent > 0 && percent < 100,
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
          color: percent < 100 ? '#1b84ff' : statusColor,
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

    .progress-result__icon {
      width: 30px;
      height: 30px;
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
