<script>
	export let topActionsChange;
</script>

<div class="flex">
	<button class="mr-4px" disabled />
	<button class="mr-4px" on:click={() => topActionsChange('c')}> C </button>
	<button on:click={() => topActionsChange('back')}> &leftarrow; </button>
</div>

<style>
	.mr-4px {
		margin-right: 4px;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2px;
		background-color: #fff;
	}
	button {
		font-family: 'Roboto', sans-serif;
		padding: 10px;
		width: 80px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
</style>
