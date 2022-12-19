import { onUnmounted, ref, watch, type Ref } from 'vue';
import type { Track } from '@/stores/track';

export const useTrackProgress = (track: Ref<Track | undefined>) => {
	const currentTime: Ref<Date> = ref(new Date());
	const secondsLeft: Ref<number> = ref(0);
	const progressPercent: Ref<number> = ref(0);

	const intervalId = setInterval(() => {
		currentTime.value = new Date();
	}, 100);

	watch(currentTime, () => {
		if (!track.value || progressPercent.value === 100) return;
		
		const { duration, time } = track.value;
		const [hrs, min, sec] = duration.split(':');

		const startTime = new Date(time);

		const trackInSeconds =
			parseInt(hrs) * 3600 + parseInt(min) * 60 + parseInt(sec);
		const secondsPassed =
			(currentTime.value.getTime() - startTime.getTime()) / 1000;

		secondsLeft.value = trackInSeconds - secondsPassed;
		progressPercent.value =
			(secondsPassed / trackInSeconds) * 100 < 100
				? (secondsPassed / trackInSeconds) * 100
				: 100;
	});

	watch(
		() => track.value?.title,
		() => (progressPercent.value = 0)
	);

	onUnmounted(() => clearInterval(intervalId));

	return { progressPercent, secondsLeft };
};
