import {CommonState} from '../../types';
import {CurrenciesAction} from './actions';
import {
    CURRENCIES_DATA,
    CURRENCIES_DATA_PRICE,
    CURRENCIES_ERROR,
    CURRENCIES_FETCH,
    CURRENCIES_FETCH_PRICE,
} from './constants';
import {Currency, CurrencyPrice} from './types';

export interface CurrenciesState extends CommonState {
    list: Currency[];
    priceList:CurrencyPrice[];
    loading: boolean;
    timestamp?: number;
}

export const initialCurrenciesState: CurrenciesState = {
    list: [],
    priceList:[],
    loading: false,
};



export const currenciesReducer = (state = initialCurrenciesState, action: CurrenciesAction) => {
    switch (action.type) {
        case CURRENCIES_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case CURRENCIES_DATA:
            return {
                ...state,
                loading: false,
                list: action.payload,
            };
        case CURRENCIES_ERROR:
            return {
                ...state,
                loading: false,
            };
        case CURRENCIES_FETCH_PRICE:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case CURRENCIES_DATA_PRICE:
            return {
                ...state,
                loading: false,
                priceList: action.payload,
            };
        default:
            return state;
    }
};
