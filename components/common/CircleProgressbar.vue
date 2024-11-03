<script setup lang="ts">
import { ProgressbarTheme } from "~/const/progressbar";

const props = withDefaults(
  defineProps<{
    percent?: number;
    theme: ProgressbarTheme;
    speed?: number;
  }>(),
  {
    percent: 0,
    speed: 100,
  },
);

const speedMs = `${props.speed}ms`;

const circumferenceLength = Math.round(2 * Math.PI * 40);
const progressOffset = computed(() =>
  Math.round(circumferenceLength * ((100 - props.percent) / 100)),
);
</script>

<template>
  <div class="circle-progressbar">
    <div class="circle-progressbar__progress-result">{{ percent }}%</div>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="circle-progressbar__svg"
    >
      <circle
        r="40"
        cx="50"
        cy="50"
        fill="transparent"
        stroke="#F6F7FA"
        stroke-width="5"
      />
      <circle
        class="circle-progressbar__gradient"
        r="40"
        cx="50"
        cy="50"
        fill="none"
        stroke-width="5"
        stroke="blue"
        stroke-linecap="round"
        :style="{
          transform:
            theme === ProgressbarTheme.Default
              ? 'rotate(-90deg)'
              : 'rotate(90deg)',
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    position: absolute;
    font-size: 1rem;
    line-height: 1rem;
  }

  .circle-progressbar__svg {
    z-index: 1;

    .circle-progressbar__gradient {
      transform-origin: center;
      transition: stroke-dashoffset ease-in-out v-bind(speedMs);
      stroke-opacity: 0.6;
    }
  }
}
</style>
