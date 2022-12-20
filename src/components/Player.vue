<script setup lang="ts">
import { currentLocalTime } from '@/utils/currentLocalTime';
import type { Track } from '@/stores/track';
import TrackItem from './TrackItem.vue';

defineProps<{
	track: Track;
	progressPercent: number;
}>();
</script>

<template>
	<div class="player">
		<TrackItem :track="track" />

		<p>{{ track.duration }}</p>
		<p>{{ currentLocalTime(track.time) }}</p>

		<div class="progress">
			<div
				class="progress__bar"
				:style="{ right: `${100 - progressPercent}%` }"
			></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.player {
	display: flex;
	align-items: center;
	flex-direction: column;

	&.loading {
		opacity: 0.3;
		pointer-events: none;
	}

	:deep(.loader) {
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
		opacity: 1;
	}

	:deep(.track-item) {
		display: block;
		text-align: center;
	}

	:deep(.track-item__img) {
		margin: 0 auto 20px;
	}

	.progress {
		position: relative;

		width: 100%;
		height: 5px;

		border-radius: 5px;
		background: var(--color-soft-white);
		margin-top: 20px;

		&__bar {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 50%;

			border-radius: 5px;
			background: var(--color-red);
		}
	}
}
</style>
