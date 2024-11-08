<script setup lang="ts">
import PieChart from "~/components/chart/PieChart.vue";
import ModalWrapper from "~/components/common/ModalWrapper.vue";
import ChartForm from "~/components/chart/ChartForm.vue";
import SegmentList from "~/components/chart/SegmentList.vue";
import UButton from "~/components/uikit/UButton.vue";

import type { ISegment } from "~/types/chart";

const editableSegment = ref<ISegment | null>(null);
const isShowChartModal = ref(false);
const isEditMode = ref(false);

const segments = ref<Array<ISegment>>([
  {
    id: 1,
    title: "Сектор-1",
    percent: 1,
    color: "#FF6384",
  },
  {
    id: 2,
    title: "Сектор-2",
    percent: 1,
    color: "#FFCD56",
  },
  {
    id: 3,
    title: "Сектор-3",
    percent: 1,
    color: "#4BC0C0",
  },
]);

const handleAddSegmentButtonClick = () => {
  isShowChartModal.value = true;
  isEditMode.value = false;

  editableSegment.value = {
    id: segments.value?.length + 1,
    title: "",
    color: "#000000",
    percent: 0,
  };
};

const handleCloseModalButtonClick = () => {
  isShowChartModal.value = false;
  editableSegment.value = null;
};

const handleAddSegmentSubmit = (data: ISegment) => {
  if (isEditMode.value) {
    const index = segments.value.findIndex(({ id }) => data.id === id);

    if (index < 0) {
      return;
    }

    segments.value = [
      ...segments.value.slice(0, index),
      data,
      ...segments.value.slice(index + 1),
    ];
  } else {
    segments.value = [...segments.value, data];
  }

  isShowChartModal.value = false;
};

const removeSegment = (removedId: number) => {
  segments.value = segments.value.filter(({ id }) => id !== removedId);
};

const editSegment = (editId: number) => {
  isShowChartModal.value = true;
  isEditMode.value = true;
  editableSegment.value =
    segments.value.find(({ id }) => id === editId) ?? null;
};
</script>

<template>
  <div class="chart-page">
    <h2 class="chart-page__title">Круговая диаграмма</h2>

    <div class="chart-page__chart-content chart-content">
      <div class="chart-content__settings settings">
        <p class="settings__caption" v-if="!segments?.length">
          Нет данных для построения графика. Добавьте сектор
        </p>
        <SegmentList
          v-else
          class="settings__list"
          :data="segments"
          @remove-segment="removeSegment"
          @edit-segment="editSegment"
        />
        <UButton
          v-if="segments?.length < 10"
          type="button"
          @click="handleAddSegmentButtonClick"
        >
          Добавить сектор
        </UButton>
      </div>
      <div class="chart-content__pie-chart">
        <PieChart :data="segments" />
      </div>
    </div>
    <ModalWrapper
      v-if="isShowChartModal && editableSegment"
      class="chart-page__modal"
      @close="handleCloseModalButtonClick"
    >
      <ChartForm
        :is-edit-mode="isEditMode"
        :data="editableSegment"
        @submit="handleAddSegmentSubmit"
      />
    </ModalWrapper>
  </div>
</template>

<style scoped>
.chart-page {
  margin-bottom: 20px;
  .chart-page__title {
    font-size: var(--size-32);
    font-weight: 600;
    color: var(--text-color);
    border-bottom: 1px solid var(--accent-gray);
    margin: 0 0 40px 0;
    padding-bottom: 30px;
    padding-left: 10px;
  }

  .chart-content {
    display: flex;
    flex-direction: column;
    .chart-content__pie-chart {
      order: 1;
      margin-bottom: 30px;
    }

    .chart-content__settings {
      order: 2;
    }
  }

  .settings {
    .settings__list {
      margin-bottom: 30px;
    }
    .settings__caption {
      margin: 0 0 20px 0;
      font-size: var(--size-12);
      color: var(--accent-red);
    }
  }
}

@media screen and (min-width: 768px) {
  .chart-page {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    max-width: 1170px;

    .chart-content {
      flex-direction: row;
      justify-content: center;
      .chart-content__pie-chart {
        order: unset;
        margin-bottom: 0;
        margin-left: 90px;
        max-width: 500px;
        width: 100%;
      }

      .chart-content__settings {
        order: unset;
      }
    }

    .settings {
      max-width: 540px;
      width: 100%;
    }
  }
}
</style>
