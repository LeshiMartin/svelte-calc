<script lang="ts">
	import Calculator from '../components/calculator.svelte';
	import { Counter } from '../srcipts/counter';
	let counter = new Counter();
	const currentCount$ = counter.currentCount;
</script>
<nav>
	<a href="/"> Home</a>
	<a href="/about"> About</a>
</nav>
<h1>Calculator</h1>

<!-- <div style="display: flex;justify-content:start">
	<button on:click={() => counter.decrement()}> - </button>
	<p>
		{$currentCount$}
	</p>
	<button on:click={() => counter.increment()}>+</button>
</div> -->

<Calculator />
