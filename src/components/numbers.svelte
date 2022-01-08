<script lang="ts">
	export let buttonAction;
	const nmBrChange = (nmb: string) => {
		buttonAction(nmb);
	};
</script>

<div class="grid">
	<div>
		<button on:click={() => nmBrChange('7')}> 7 </button>
		<button on:click={() => nmBrChange('8')}> 8 </button>
		<button on:click={() => nmBrChange('9')}> 9 </button>
	</div>
	<div>
		<button on:click={() => nmBrChange('6')}> 6 </button>
		<button on:click={() => nmBrChange('5')}> 5 </button>
		<button on:click={() => nmBrChange('4')}> 4 </button>
	</div>
	<div>
		<button on:click={() => nmBrChange('3')}> 3 </button>
		<button on:click={() => nmBrChange('2')}> 2 </button>
		<button on:click={() => nmBrChange('1')}> 1 </button>
	</div>
	<div>
		<button disabled />
		<button on:click={() => nmBrChange('0')}> 0 </button>
		<button on:click={() => nmBrChange('.')}> . </button>
	</div>
</div>

<style>
	.grid {
		display: grid;
		row-gap: 5px;
	}
	.grid div {
		display: flex;
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
