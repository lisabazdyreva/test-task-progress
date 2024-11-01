<script setup lang="ts">
import CircleProgressbar from "~/components/common/CircleProgressbar.vue";

const theme = ref<"default" | "dashboard">();
const firstPercent = ref(0);
const firstSpeed = ref(50);

let intervalId: NodeJS.Timeout | undefined = undefined;

const counter = () => {
  if (firstPercent.value > 99) {
    clearInterval(intervalId);
    intervalId = undefined;
    return;
  }
  firstPercent.value += 1;
};

const handleStartProgressbar = () => {
  if (firstPercent.value > 99) {
    firstPercent.value = 0;
  }

  intervalId = setInterval(counter, firstSpeed.value);
};

const handleViewButtonClick = () => {
  theme.value = theme.value === "default" ? "dashboard" : "default";
};
</script>

<template>
  <div>
    <main>
      <div>
        <button
          id="trigger"
          :disabled="!!intervalId"
          type="button"
          @click="handleStartProgressbar"
        >
          Start First timer
        </button>
        <button type="button" @click="handleViewButtonClick">
          Change View
        </button>
        <CircleProgressbar
          :theme="theme"
          :percent="firstPercent"
          :speed="firstSpeed"
        />
      </div>

      <!--			<CircleProgressbar :percent="50">-->
      <!--				0%-->
      <!--			</CircleProgressbar>-->
    </main>
  </div>
</template>

<style scoped></style>
