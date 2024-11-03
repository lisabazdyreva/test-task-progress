<script setup lang="ts">
const emits = defineEmits<{
  (e: "close"): void;
}>();

const handleEscKeydown = (evt: KeyboardEvent) => {
  if (evt.key === "Escape") {
    emits("close");
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
    <div class="common-modal-wrapper__bg" @click="() => $emit('close')" />
    <div class="common-modal-wrapper__inner-wrapper">
      <button
        class="common-modal-wrapper__close-button"
        type="button"
        @click="$emit('close')"
      />
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

  .common-modal-wrapper__close-button {
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 4px;
    background-color: transparent;

    width: 20px;
    height: 20px;
    padding: 0;

    position: absolute;
    right: var(--modal-pd);
    cursor: pointer;
    z-index: 1;
  }

  .common-modal-wrapper__close-button:hover::after,
  .common-modal-wrapper__close-button:hover::before {
    background-color: var(--accent-gray-hover);
  }

  .common-modal-wrapper__close-button::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: var(--accent-gray);
    transition: background-color ease-in-out 0.1s;
    transform: rotate(45deg);
    border-radius: 2px;
  }

  .common-modal-wrapper__close-button::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: var(--accent-gray);
    transition: background-color ease-in-out 0.1s;
    transform: rotate(-45deg);
    border-radius: 2px;
  }

  .common-modal-wrapper__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--dark-trasparent-bg);
  }

  .common-modal-wrapper__inner-wrapper {
    position: relative;
    width: calc(100% - 40px);
    min-width: 250px;
    max-width: 390px;
    border-radius: 15px;
    background-color: var(--light-bg);

    padding: var(--modal-pd) 0 var(--modal-pd) var(--modal-pd);
    z-index: 2;
  }
}
</style>
