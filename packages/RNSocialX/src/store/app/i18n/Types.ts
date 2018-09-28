import { Action } from 'redux';
import { DeepReadonly } from 'utility-types';

export const enum AvailableLocales {
	EN = 'en',
	ES = 'es',
}

export type IAvailableLocales = AvailableLocales.EN | AvailableLocales.ES;

export interface ILocaleDictionary {
	[key: string]: string;
}

export interface IDictionary {
	[AvailableLocales.EN]: ILocaleDictionary;
	[AvailableLocales.ES]: ILocaleDictionary;
}

export type IState = DeepReadonly<{
	currentLocale: IAvailableLocales;
	dictionary: IDictionary;
}>;

export const enum ActionTypes {
	SET_LOCALE = 'app/i18n/SET_LOCALE',
}

export interface ISetLocaleInput {
	locale: IAvailableLocales;
}

export interface ISetLocaleAction extends Action {
	type: ActionTypes.SET_LOCALE;
	payload: ISetLocaleInput;
}

export type IAction = ISetLocaleAction;