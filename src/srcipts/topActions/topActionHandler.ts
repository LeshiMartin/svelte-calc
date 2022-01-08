export abstract class TopActionHandler {
	abstract handle(...param: string[]): string[];
}
class CleatItems implements TopActionHandler {
	handle(...param: string[]): string[] {
		return ['', '', ''];
	}
}

class RemoveItem implements TopActionHandler {
	handle(...param: string[]): string[] {
		return [param[0].slice(0, param[0].length - 1), param[1], param[2]];
	}
}

export class TopActionProvider {
	constructor() {}

	private _clearItems: CleatItems;
	private _removeItem: RemoveItem;

	private options = {
		c: () => {
			if (this._clearItems) return this._clearItems;
			this._clearItems = new CleatItems();
			return this._clearItems;
		},
		back: () => {
			if (this._removeItem) return this._removeItem;
			this._removeItem = new RemoveItem();
			return this._removeItem;
		}
	};

	getTopActionHandler(action: string): TopActionHandler {
		const handler = this.options[action]();
		return handler;
	}
}
