import {
    CURRENCIES_DATA,
    CURRENCIES_DATA_PRICE,
    CURRENCIES_ERROR,
    CURRENCIES_FETCH,
    CURRENCIES_FETCH_PRICE,
} from './constants';
import {Currency, CurrencyPrice} from './types';

export interface CurrenciesFetch {
    type: typeof CURRENCIES_FETCH;
}

export interface CurrenciesData {
    type: typeof CURRENCIES_DATA;
    payload: Currency[];
}

export interface CurrenciesError {
    type: typeof CURRENCIES_ERROR;
}

export interface CurrenciesFetchPrice {
    type: typeof CURRENCIES_FETCH_PRICE;
}

export interface CurrenciesDataPrice {
    type: typeof CURRENCIES_DATA_PRICE;
    payload: CurrencyPrice[];
}

export type CurrenciesAction =
    CurrenciesFetch
    | CurrenciesData
    | CurrenciesError
    | CurrenciesDataPrice
    | CurrenciesFetchPrice;

export const currenciesFetch = (): CurrenciesFetch => ({
    type: CURRENCIES_FETCH,
});

export const currenciesData = (payload: CurrenciesData['payload']): CurrenciesData => ({
    type: CURRENCIES_DATA,
    payload,
});

export const currenciesError = (): CurrenciesError => ({
    type: CURRENCIES_ERROR,
});

export const currenciesFetchPrice = (): CurrenciesFetchPrice => ({
    type: CURRENCIES_FETCH_PRICE,
});

export const currenciesDataPrice = (payload: CurrenciesDataPrice['payload']): CurrenciesDataPrice => ({
    type: CURRENCIES_DATA_PRICE,
    payload,
});
