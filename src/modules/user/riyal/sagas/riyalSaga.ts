// tslint:disable-next-line
import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import {alertPush} from '../../../public/alert';
import {cardsData, cardsError} from '../actions';

const financialOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* riyalSaga() {
    try {
        const cards = yield call(API.get(financialOptions), '/account/cards/all');
        yield put(cardsData(cards));

    } catch (error) {
        yield put(cardsError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
