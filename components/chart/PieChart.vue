<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

const props = defineProps<{
  data: Array<{
    title: string;
    percent: number;
    color: string;
  }>;
}>();

const dataComputed = ref(props.data);

const getValuesByKey = (
  arr: Array<{ title: string; percent: number; color: string }>,
  key: "title" | "percent" | "color",
) => {
  return arr.reduce((prev, curr) => {
    prev = [...prev, curr?.[key]];
    return prev;
  }, []);
};

const labels = computed(() => getValuesByKey(props.data, "title"));
const colors = computed(() => getValuesByKey(props.data, "color"));
const percents = computed(() => getValuesByKey(props.data, "percent"));

const data = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      backgroundColor: colors.value,
      data: percents.value,
    },
  ],
}));

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

ChartJS.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped></style>
