<script>
	export let onActionChange;
</script>

<div>
	<button on:click={() => onActionChange('=')}> = </button>
	<button on:click={() => onActionChange('/')}> / </button>
	<button on:click={() => onActionChange('*')}> * </button>
	<button on:click={() => onActionChange('-')}> - </button>
	<button on:click={() => onActionChange('+')}> + </button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #fff;
	}
	button {
		font-family: 'Roboto', sans-serif;
		padding: 10px;
		width: 80px;
		height: 35px;
		cursor: pointer;
	}
</style>
