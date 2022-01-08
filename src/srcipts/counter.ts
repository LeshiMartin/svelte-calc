import { writable } from 'svelte/store';
export class Counter {
	constructor() {}
	private _currentCount = 0;
	currentCount = writable(0);
	increment() {
		this._currentCount++;
    this.notify();
	}
	decrement() {
		this._currentCount--;
    this.notify();
	}

	private notify() {
		this.currentCount.set(this._currentCount);
	}
}
