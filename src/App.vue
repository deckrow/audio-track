<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTrackStore } from '@/stores/track';
import { useTrackProgress } from '@/composables/useTrackProgress';
import { sleep } from '@/utils/sleep';

import TrackList from '@/components/TrackList.vue';
import Player from '@/components/Player.vue';
import Loader from '@/components/Loader.vue';

const store = useTrackStore();
const { activeTrack, historyTracks, initial } = storeToRefs(store);
const { progressPercent, secondsLeft } = useTrackProgress(activeTrack);

let shouldFetchTracks: boolean = true;

onMounted(async () => {
	while (shouldFetchTracks) {
		const sleepForSec = secondsLeft.value > 0 ? secondsLeft.value : 2;

		await store.fetchTracks();
		await sleep(sleepForSec * 1000);
	}
});

onUnmounted(() => (shouldFetchTracks = false));
</script>

<template>
	<main>
		<div class="container">
			<template v-if="activeTrack && historyTracks.length">
				<Player
					:track="activeTrack"
					:progressPercent="progressPercent"
				/>

				<TrackList :tracks="historyTracks" />
			</template>

			<Loader v-else-if="!initial" />

			<p
				class="error-message"
				v-else
			>
				There is something wrong!
				<br />
				Please, try again later.
			</p>
		</div>
	</main>
</template>

<style scoped lang="scss">
.container {
	max-width: 600px;
	margin: 0 auto;
}

main {
	:deep(.player) {
		margin-bottom: 50px;
	}

	:deep(.loader) {
		margin: 0 auto;
	}

	.error-message {
		font-size: 20px;
		font-weight: 500;

		color: black;
		text-align: center;
	}
}
</style>
