<script setup lang="ts">
import type { Track } from '@/stores/track';
import TrackItem from './TrackItem.vue';

defineProps<{ tracks: Track[] }>();
</script>

<template>
	<div class="track-list">
		<TrackItem
			v-for="track of tracks"
			:track="track"
			:key="track.iTunesTrackUrl"
		/>
	</div>
</template>

<style scoped lang="scss">
.track-list {
	display: flex;
	flex-direction: column;
	
	:deep(.track-item) {
		margin-bottom: 15px;
	}
}
</style>
