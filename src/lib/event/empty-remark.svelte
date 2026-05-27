<script lang="ts">
	let { text }: { text: string } = $props();
</script>

<div class="flex flex-col items-center gap-4">
	<svg viewBox="0 0 60 102" fill="none" class="w-12 md:w-16">
		<path
			d="M58.759 101.274H0.5V98.8009L6.66811 72.2158H51.9283L58.759 98.8009V101.274Z"
			fill="#981313"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
		<path
			d="M58.759 98.8009H0.5L6.66811 69.7363H51.9283L58.759 98.8009Z"
			fill="#FF4040"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
		<path
			d="M29.8116 88.6916C40.997 88.6916 50.0646 85.346 50.0646 81.2189C50.0646 77.0918 40.997 73.7461 29.8116 73.7461C18.6262 73.7461 9.55859 77.0918 9.55859 81.2189C9.55859 85.346 18.6262 88.6916 29.8116 88.6916Z"
			fill="#981313"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
		<path
			d="M12.3242 80.3166L26.211 0.5H32.8983L47.2973 80.3166C47.2973 80.3166 43.438 85.0913 29.8108 85.0913C16.1836 85.0913 12.3242 80.3166 12.3242 80.3166Z"
			fill="#FF4040"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
		<path
			d="M40.3108 41.5801C37.7288 42.2768 34.2998 42.7891 29.8121 42.7891C25.3243 42.7891 21.6835 42.2359 19.0742 41.5118L20.1603 35.2686C22.7696 35.9926 25.1809 36.5459 29.8121 36.5459C34.4433 36.5459 36.554 36.0268 39.1291 35.3369L40.3108 41.5801Z"
			fill="white"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
		<path
			d="M21.9824 24.8244C21.9824 24.8244 26.7229 25.446 29.8172 25.446C32.7408 25.446 37.3037 24.8791 37.3037 24.8791L36.2107 18.7998C36.2107 18.7998 32.2489 19.2028 29.8241 19.2028C27.2216 19.2028 23.048 18.7451 23.048 18.7451L21.9893 24.8176L21.9824 24.8244Z"
			fill="white"
			stroke="#1A1A1A"
			stroke-miterlimit="10"
			stroke-linejoin="round"
		/>
	</svg>

	<p class="wv-b5 max-w-md text-center text-neutral-700">{text}</p>
</div>
