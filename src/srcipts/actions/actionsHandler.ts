export abstract class ActionsHandler {
	abstract Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[];
}

export class ActionHandlerProvider {
	private _divide: DivideHandler;
	private _multiply: MultiplyHandler;
	private _add: AddHandler;
	private _subtract: SubtractHandler;
	private _equals: EqualsHandler;

	private _options: { [key: string]: () => ActionsHandler } = {
		'/': () => {
			if (!this._divide) this._divide = new DivideHandler();
			return this._divide;
		},
		'*': () => {
			if (!this._multiply) this._multiply = new MultiplyHandler();
			return this._multiply;
		},
		'-': () => {
			if (!this._subtract) this._subtract = new SubtractHandler();
			return this._subtract;
		},
		'+': () => {
			if (!this._add) this._add = new AddHandler();
			return this._add;
		},
		'=': () => {
			if (!this._equals) this._equals = new EqualsHandler();
			return this._equals;
		}
	};

	getHandler(action: string): ActionsHandler {
		return this._options[action]();
	}
}

class BaseHandler {
	provider = new ActionHandlerProvider();
	isSameAction(prevAction: string, currentAction: string): boolean {
		const result = prevAction === currentAction;
		return result;
	}

	assignAndReturnValues(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		prevAction = currentAction;
		return [prevValue, '0', '', prevAction];
	}

	getHandlerAndHandle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		const handler = this.provider.getHandler(prevAction);
		const response = handler.Handle(currentValue, prevValue, prevAction, prevAction);
		return [response[0], '0', '', currentAction];
	}
}

class EqualsHandler extends BaseHandler implements ActionsHandler {
	Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		if (prevAction) {
			const handler = this.provider.getHandler(prevAction);
			const response = handler.Handle(currentValue, prevValue, prevAction, prevAction);
			return ['', response[0], '', ''];
		}
		return ['', prevValue, '', ''];
	}
}

class DivideHandler extends BaseHandler implements ActionsHandler {
	Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		let tempValue = currentValue;
		if (this.isSameAction(prevAction, currentAction)) {
			tempValue = `${+prevValue / +currentValue}`;
		} else if (prevAction) {
			return this.getHandlerAndHandle(currentValue, prevValue, currentAction, prevAction);
		}
		return this.assignAndReturnValues(currentValue, tempValue, currentAction, prevAction);
	}
}

class MultiplyHandler extends BaseHandler implements ActionsHandler {
	Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		let tempValue = currentValue;
		if (this.isSameAction(prevAction, currentAction)) {
			tempValue = `${+prevValue * +currentValue}`;
		} else if (prevAction) {
			return this.getHandlerAndHandle(currentValue, prevValue, currentAction, prevAction);
		}
		return this.assignAndReturnValues(currentValue, tempValue, currentAction, prevAction);
	}
}

class AddHandler extends BaseHandler implements ActionsHandler {
	Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		let tempValue = currentValue;
		if (this.isSameAction(prevAction, currentAction)) {
			tempValue = `${+prevValue + +currentValue}`;
		} else if (prevAction) {
			return this.getHandlerAndHandle(currentValue, prevValue, currentAction, prevAction);
		}
		return this.assignAndReturnValues(currentValue, tempValue, currentAction, prevAction);
	}
}

class SubtractHandler extends BaseHandler implements ActionsHandler {
	Handle(
		currentValue: string,
		prevValue: string,
		currentAction: string,
		prevAction: string
	): any[] {
		let tempValue = currentValue;
		if (this.isSameAction(prevAction, currentAction)) {
			tempValue = `${+prevValue - +currentValue}`;
		} else if (prevAction) {
			return this.getHandlerAndHandle(currentValue, prevValue, currentAction, prevAction);
		}
		return this.assignAndReturnValues(currentValue, tempValue, currentAction, prevAction);
	}
}
