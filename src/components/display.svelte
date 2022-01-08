<script>
	export let prevValue;
	export let prevAction;
	export let currentDisplayItem;
</script>

<div>
	<p>
		<sup>
			<span>{prevValue}</span>
			<span class="ml-1">
				{prevAction}
			</span>
		</sup>
		{currentDisplayItem}
	</p>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		justify-content: end;
		border: solid 1px #888888;
		border-radius: 5px;
		background: #fff;
		min-height: 40px;
		align-items: center;
		padding: 5px 0;
	}
	p {
		margin: 0 10px;
		font-family: 'Roboto', sans-serif;
		overflow: auto;
		width: 320px;
		text-align: end;
	}
	.ml-1 {
		margin-left: 0.25em;
	}
</style>
