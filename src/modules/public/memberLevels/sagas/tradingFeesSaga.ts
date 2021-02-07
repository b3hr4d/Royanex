// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../alert';
import { tradingFeesData } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* tradingFeesSaga() {
    try {
        const data = yield call(API.get(requestOptions), '/public/trading_fees');
        yield put(tradingFeesData(data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
