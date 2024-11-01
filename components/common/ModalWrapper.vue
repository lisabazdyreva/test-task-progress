<script setup lang="ts">
const emits = defineEmits<{
  (e: "close"): void;
}>();

const handleEscKeydown = (evt: KeyboardEvent) => {
  if (evt.key === "Escape") {
    emits('close');
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscKeydown);
});
</script>

<template>
  <div class="common-modal-wrapper">
    <div class="common-modal-wrapper__bg" @click="() => $emit('close')"/>
    <div class="common-modal-wrapper__inner-wrapper">
      <button type="button" @click="$emit('close')">Close</button>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.common-modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .common-modal-wrapper__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--dark-trasparent-bg);
  }

  .common-modal-wrapper__inner-wrapper {
    border-radius: 15px;
    background-color: var(--light-bg);
    padding: 20px;
    z-index: 2;
  }
}
</style>
