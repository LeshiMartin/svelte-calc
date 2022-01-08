import { writable } from 'svelte/store';

class KeyPressTracker {
	onNumberPressed = writable('0');
	onActionsPressed = writable();

	trackCalculatorKeyPress(id: string) {
		let el = document.getElementById(id);
		const actions = ['+', '-', '*', '/', '='];
		el.addEventListener('keyup', (ev) => {
			if (+ev.key || ev.key === '0') {
				this.onNumberPressed.update((x) => {
					if (x == ev.key) {
						setTimeout(() => {
							this.onNumberPressed.set(x);
						}, 5);
						return undefined;
					}
					return ev.key;
				});
			} else if (actions.includes(ev.key)) {
				this.onActionsPressed.set(ev.key);
			} else if (ev.key == 'Enter') {
				this.onActionsPressed.set('=');
			}
		});
	}
}

export abstract class KeyPressTackProvider {
	private static _tracker: KeyPressTracker;

	static getTracker(): KeyPressTracker {
		if (!this._tracker) this._tracker = new KeyPressTracker();
		return this._tracker;
	}
}
