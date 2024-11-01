<script setup lang="ts">
import SegmentItem from "~/components/chart/SegmentItem.vue";

defineProps<{
  data: {
    title: string;
    percent: number;
    color: string;
  };
}>();
</script>

<template>
  <ul class="chart-segment-list">
    <li v-for="segment in data" class="chart-segment-list__item">
      <SegmentItem :data="segment" />
    </li>
  </ul>
</template>

<style scoped>
.chart-segment-list {
  list-style: none;
  margin: 0;
  padding: 0;

  .chart-segment-list__item {
    padding: 18px 20px;
    margin-bottom: 5px;
    background-color: var(--accent-gray-transparent);
    border-radius: 10px;
    color: var(--text-color);
  }
  .chart-segment-list__item:last-child {
    margin-bottom: 0;
  }
}
</style>
