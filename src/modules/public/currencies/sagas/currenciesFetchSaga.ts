import {call, put, takeLeading} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import {alertPush} from '../../alert';
import {
    currenciesData,
    currenciesDataPrice,
    currenciesError,
} from '../actions';
import {CURRENCIES_FETCH, CURRENCIES_FETCH_PRICE} from '../constants';


const currenciesOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* rootCurrenciesSaga() {
    yield takeLeading(CURRENCIES_FETCH, currenciesFetchSaga);
    yield takeLeading(CURRENCIES_FETCH_PRICE, currenciesFetchPriceSaga);
}

export function* currenciesFetchSaga() {
    try {
        const currencies = yield call(API.get(currenciesOptions), '/public/currencies');
        yield put(currenciesData(currencies));
    } catch (error) {
        yield put(currenciesError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* currenciesFetchPriceSaga() {
    try {
        const currencies = yield call(API.get(currenciesOptions), '/public/currencies/price');
        yield put(currenciesDataPrice(currencies));
    } catch (error) {
        yield put(currenciesError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
