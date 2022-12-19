import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';

export type Track = {
	title: string;
	artist: string;

	iTunesTrackUrl: string;
	imageUrl: string;
	previewUrl: string;

	// start time (format: yyyy-mm-ddT00:00:00Z)
	time: Date;

	// how long track lasts
	duration: string;

	// playing or was played
	status: 'playing' | 'history';
};

export const useTrackStore = defineStore('track', () => {
	// state
	const initial: Ref<boolean> = ref(false);
	const loading: Ref<boolean> = ref(false);
	const error: Ref<string> = ref('');
	const tracks: Ref<Track[]> = ref([]);

	// getters
	const activeTrack = computed(() => 
		tracks.value.find(t => t.status === 'playing')
	);

	const historyTracks = computed(() =>
		tracks.value
			.filter(t => t.status === 'history')
			.sort(
				(t1, t2) => new Date(t2.time).getTime() - new Date(t1.time).getTime()
			)
	);

	// actions
	const fetchTracks = async () => {
		try {
			const response = await fetch(import.meta.env.VITE_API_URL);
			const data: { nowplaying: Track[] } = await response.json();

			setFetchedTracks(data.nowplaying);
			setInitial(true);
		} catch (err) {
			error.value = (err as Error).message;
		}
	}

	// mutations
	const setFetchedTracks = (newTracks: Track[]) => {
		tracks.value = newTracks;
	}

	const setInitial = (newInitial: boolean) => {
		initial.value = newInitial;
	}

	return {
		initial,
		loading,
		error,

		tracks,
		historyTracks,
		activeTrack,

		fetchTracks,
	};
});
