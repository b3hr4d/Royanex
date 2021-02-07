import { call, put, takeLatest } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../alert';
import {
    paymentsData,
    paymentsError,
    PaymentsFetch,
} from '../actions';
import { PAYMENTS_FETCH } from '../constants';

const paymentsOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* rootPaymentsSaga() {
    yield takeLatest(PAYMENTS_FETCH, handlePaymentsFetchSaga);
}

function* handlePaymentsFetchSaga(action: PaymentsFetch) {
    try {
        yield call(API.post(paymentsOptions), '/public/jibit/call-back', action.payload);
        yield put(alertPush({ message: ['success.payment.confirmed'], type: 'success' }));
        yield put(paymentsData());
    } catch (error) {
        if (error.message[0] === undefined) {
            error.message[0] = 'server.internal_error';
        }
        yield put(paymentsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}
