<script setup lang="ts">
import {
  type ColorChangeDetail,
  ColorPicker,
} from "vue-accessible-color-picker";
import "vue-accessible-color-picker/styles";

defineProps<{
  color: string;
}>();

const emits = defineEmits<{
  (e: "color-change", value: string): void;
}>();

const handleColorChange = (colorValue: ColorChangeDetail) => {
  emits("color-change", colorValue.cssColor);
};
</script>

<template>
  <div>
    <ColorPicker
      class="color-picker"
      defaultFormat="hex"
      :color="color"
      :visibleFormats="['hex']"
      @color-change="handleColorChange"
    >
      <template #copy-button>
        <span class="color-preview" :style="{ backgroundColor: color }" />
      </template>

      <template #alpha-range-input-label>
        <span class="visually-hidden" />
      </template>

      <template #hue-range-input-label>
        <span class="visually-hidden" />
      </template>

      <template>
        <div>dfdf</div>
      </template>
    </ColorPicker>
  </div>
</template>

<style>
.vacp-color-picker.color-picker {
  --vacp-width-color-space: 350;
  --vacp-spacing: 4px;
  --vacp-color-border: #ffffff;

  .vacp-copy-button {
    padding: 0;
  }

  .vacp-color-space {
    border-radius: 10px;
  }

  .vacp-range-input::-webkit-slider-runnable-track {
    border-radius: 10px;
  }

  .color-preview {
    display: block;
    width: 100%;
    height: 100%;
  }

  .vacp-color-input-label {
    display: flex;
    flex-direction: column;
    align-items: center;

    .vacp-color-input-label-text {
      color: var(--text-gray);
      margin-bottom: 4px;
    }

    .vacp-color-input {
      outline: 2px solid var(--accent-gray);
      border-radius: 10px;
    }

    .vacp-color-input:focus {
      outline-color: var(--accent-blue);
    }
  }

  .visually-hidden {
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
}
</style>
