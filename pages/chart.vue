<script setup lang="ts">
import PieChart from "~/components/chart/PieChart.vue";
import ModalWrapper from "~/components/common/ModalWrapper.vue";
import ChartForm from "~/components/chart/ChartForm.vue";
import SegmentList from "~/components/chart/SegmentList.vue";
import UButton from '~/components/uikit/UButton.vue';

const isShowChartModal = ref(false);

const segments = [
  {
    title: "Сектор-1",
    percent: 25,
    color: "#FF6384",
  },
  {
    title: "Сектор-2",
    percent: 25,
    color: "#FFCD56",
  },
  {
    title: "Сектор-3",
    percent: 25,
    color: "#4BC0C0",
  },
];

const handleAddSegmentButtonClick = () => {
  isShowChartModal.value = true;
};

const handleCloseModalButtonClick = () => {
  isShowChartModal.value = false;
};
</script>

<template>
  <div class="chart-page">
    <h2 class="chart-page__title">Круговая диаграмма</h2>

    <div class="chart-page__chart-content chart-content">
      <div class="chart-content__settings settings">
        <SegmentList class="settings__list" :data="segments" />
        <UButton type="button" @click="handleAddSegmentButtonClick">
          Добавить сектор
        </UButton>
      </div>
      <div class="chart-content__pie-chart">Chart</div>
    </div>
    <ModalWrapper
      v-if="isShowChartModal"
      class="chart-page__modal"
      @close="handleCloseModalButtonClick"
    >
      <ChartForm />
    </ModalWrapper>
  </div>
</template>

<style scoped>
.chart-page {
  .chart-page__title {
    font-size: var(--size-32);
    color: var(--text-color);
    border-bottom: 1px solid #dbdfe9;
    margin: 0 0 40px 0;
    padding-bottom: 30px;
  }

  .chart-content {
    display: flex;
    flex-direction: column;
    .chart-content__pie-chart {
      order: 1;
    }

    .chart-content__settings {
      order: 2;
    }
  }

  .settings {
    .settings__list {
      margin-bottom: 30px;
    }
  }
}
</style>
