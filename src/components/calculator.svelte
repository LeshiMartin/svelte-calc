<script lang="ts">
	import Numbers from './numbers.svelte';
	import TopActions from './top-actions.svelte';
	import Display from './display.svelte';
	import Actions from './actions.svelte';
	import { TopActionProvider } from '../srcipts/topActions/topActionHandler';
	import { ActionHandlerProvider } from '../srcipts/actions/actionsHandler';
	import { KeyPressTackProvider } from '../srcipts/shared/keyPressTracker';
	import { onMount } from 'svelte';

	let prevValue = '';
	let prevAction = '';
	let currentItem = '';

	const topActionProvider = new TopActionProvider();
	const actionHandlerProvider = new ActionHandlerProvider();

	const tracker = KeyPressTackProvider.getTracker();

	const handleParamChange = (param: string) => {
		if (param == null) return;
		if (param == '.') if (currentItem.includes('.')) return;
		currentItem = currentItem == '0' ? param : `${currentItem}${param}`;
	};
	const topAction = (action: string) => {
		const handler = topActionProvider.getTopActionHandler(action);
		[currentItem, prevValue, prevAction] = handler.handle(currentItem, prevValue, prevAction);
	};
	const acionChange = (action: string) => {
		const handler = actionHandlerProvider.getHandler(action);
		const response = handler.Handle(currentItem, prevValue, action, prevAction);
		let disposed;
		[prevValue, currentItem, disposed, prevAction] = response;
	};

	onMount(() => {
		tracker.trackCalculatorKeyPress('calculator');
		const doc = document.getElementById('calculator');
		doc.focus();
		tracker.onNumberPressed.subscribe((val: string) => {
			console.log(val);

			handleParamChange(val);
		});
		tracker.onActionsPressed.subscribe((val: string) => {
			if (!!val) acionChange(val);
		});
	});
</script>

<div id="calculator" tabindex="-1">
	<div class="calc-main">
		<div>
			<Display currentDisplayItem={currentItem} {prevValue} {prevAction} />
		</div>
		<div class="sub-grid">
			<div>
				<TopActions topActionsChange={topAction} />
				<Numbers buttonAction={handleParamChange} />
			</div>
			<div class="sub--grid">
				<Actions onActionChange={acionChange} />
			</div>
		</div>
	</div>
</div>

<style>
	#calculator {
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
	}
	#calculator:focus-within {
		border: none;
		outline: none;
	}
	.calc-main {
		width: 340px;
		margin: auto;
		display: grid;
		box-shadow: 0px 0px 4px #888888;
		justify-items: center;
		padding: 20px 30px;
		grid-template-columns: 1fr;
		background-color: #e5e5e5;
		border-radius: 5px;
	}
	.calc-main > div {
		width: 100%;
		background-color: #fff;
		margin-bottom: 5px;
	}
	.sub-grid {
		display: grid;
		grid-template-columns: 3fr 0.5fr;
		column-gap: 5px;
		background-color: #fff;
	}
	.sub--grid {
		display: grid;
		background-color: #fff;
	}
</style>
