<script setup lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Pie } from "vue-chartjs";
import type { ISegment } from "~/types/chart";

const props = defineProps<{
  data: Array<ISegment>;
}>();

type SegmentKey = keyof ISegment;

const getValuesByKey = <T,>(
  arr: Array<ISegment>,
  key: SegmentKey,
): Array<T> => {
  return arr.reduce((prev: T[], curr) => {
    const val = curr?.[key] as T;
    prev = [...prev, val];
    return prev;
  }, []);
};

const labels = computed(() => getValuesByKey<string>(props.data, "title"));
const colors = computed(() => getValuesByKey<string>(props.data, "color"));
const percents = computed(() => getValuesByKey<number>(props.data, "percent"));

const data = computed<ChartData<"pie", number[], unknown>>(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        backgroundColor: colors.value,
        data: percents.value,
      },
    ],
  };
});

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxHeight: 14,
        boxWidth: 14,
        usePointStyle: true,
        color: "#3C3C3C",
        padding: 30,
      },
    },
  },
};

ChartJS.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped></style>
