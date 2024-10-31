<script setup lang="ts">

const props = withDefaults(
	defineProps<{
		percent?: number;
		theme?: "default" | "custom";
	}>(), {
		theme: "default",
		percent: 0,
	},
);

const circumferenceLength = Math.round(2 * 3.14 * 40);
const progressOffset =  computed(() => Math.round(circumferenceLength * ((100 - props.percent) / 100)));
</script>

<template>
	<div class="circle-progressbar">
		<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="circle-progressbar__svg">
			<circle r="40" cx="50" cy="50" fill="transparent" stroke="#F6F7FA" stroke-width="5" />
			<circle
				r="40"
				cx="50"
				cy="50"
				fill="transparent"
				stroke="#20A0FF"
				stroke-width="5"
				stroke-linecap="round"
				:stroke-dasharray="circumferenceLength"
				:stroke-dashoffset="progressOffset"
			/>
		</svg>
		<div class="circle-progressbar__progress-result">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.circle-progressbar {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100px;
	height: 100px;
}

.circle-progressbar__progress-result {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	position: absolute;
	font-size: 1rem;
	line-height: 1rem;
}

.circle-progressbar__svg {
	transform: rotate(-90deg);
}
</style>
