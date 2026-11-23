export default function (refresh: () => Promise<void>, intervalMs = 5000) {
	let timer: ReturnType<typeof setTimeout> | null = null
	let running = false

	onMounted(() => {
		document.addEventListener('visibilitychange', onVisibility)
		if (document.visibilityState === 'visible') start()
	})

	onBeforeUnmount(() => {
		document.removeEventListener('visibilitychange', onVisibility)
		stop()
	})
	function onVisibility() {
		if (document.visibilityState === 'visible') {
			start()
		}
		else {
			stop()
		}
	}

	function start() {
		if (running) return
		running = true
		tick()
	}

	function stop() {
		running = false
		if (timer) clearTimeout(timer)
		timer = null
	}

	async function tick() {
		if (!running) return
		try {
			await refresh()
		}
		finally {
			// schedule the next run only after the previous one finishes (no overlapping requests)
			if (running) timer = setTimeout(tick, intervalMs)
		}
	}
}
