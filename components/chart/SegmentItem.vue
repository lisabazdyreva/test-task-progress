<script setup lang="ts">
import EditIcon from '~/components/icons/EditIcon.vue';
import RemoveIcon from '~/components/icons/RemoveIcon.vue';

defineProps<{
  data: {
    title: string;
    percent: number;
    color: string;
  };
}>();
</script>

<template>
  <div class="chart-segment-item">
    <div class="chart-segment-item__info info">
      <div class="info__title">{{ data.title }}</div>
      <div class="info__percent">{{ data.percent }}%</div>
      <div class="info__color"></div>
    </div>

    <div class="chart-segment-item__actions actions">
      <button class="actions__edit-button" type="button">
        <EditIcon class="actions__edit-icon" />
      </button>
      <button class="actions__remove-button" type="button">
        <RemoveIcon class="actions__remove-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.chart-segment-item {
  display: flex;

  .info {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .info__title {
      font-size: var(--size-16);
      line-height: var(--size-24);

      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -moz-box;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-clamp: 1;
      box-orient: vertical;
      word-break: break-word;
    }

    .info__percent {
      font-size: var(--size-16);
      line-height: var(--size-24);
      flex-shrink: 0;
      border-left: 2px solid var(--accent-gray);
      border-right: 2px solid var(--accent-gray);
      padding-right: 25px;
      padding-left: 25px;
      border-radius: 2px;
    }

    .info__color {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      background-color: v-bind(data.color);
      border-radius: 50%;
      margin-left: 25px;
    }
  }

  .actions {
    display: flex;
    margin-left: auto;

    .actions__edit-button {
      margin-right: 20px;
    }

    .actions__remove-button,
    .actions__edit-button {
      display: flex;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--accent-gray);
      transition: color ease-in-out 0.1s;
    }

    .actions__remove-button:hover,
    .actions__edit-button:hover {
      color: var(--accent-gray-hover);
    }

    .actions__remove-icon,
    .actions__edit-icon {
      color: inherit;
    }
  }
}
</style>
