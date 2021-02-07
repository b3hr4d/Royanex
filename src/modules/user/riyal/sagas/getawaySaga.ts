// tslint:disable-next-line
import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import {alertPush} from '../../../public/alert';
import {
    cardsData,
    cardVerifyData,
    cardVerifyError,
    CardVerifyPostAction,
    CartPostData,
    getawayError,
    GetawayFetch,
} from '../actions';

const financialOptions: RequestOptions = {
    apiVersion: 'app',
};


export function* getawaySaga(action: GetawayFetch) {
    try {
        const data = yield call(API.post(financialOptions), '/account/deposits/riyal', action.payload);
        window.location.replace(data);
    } catch (error) {
        yield put(getawayError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* cartSaga(action: CartPostData) {
    try {
        yield call(API.post(financialOptions), '/account/cards/new', action.payload);
        const cards = yield call(API.get(financialOptions), '/account/cards/all');
        yield put(cardsData(cards));
        yield put(alertPush({message: ['page.body.profile.content.bankInfo.modal.submit.success'], type: 'success'}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));

        return false;
    }
}

export function* cardVerifySaga(action: CardVerifyPostAction) {
    try {
        const result = yield call(API.post(financialOptions), '/account/cards/check', action.payload);
        yield put(cardVerifyData(result));
        yield put(alertPush({message: ['page.body.profile.content.result.succeed'], type: 'success'}));
    } catch (error) {
        yield put(cardVerifyError());
        yield put(getawayError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));

        return false;
    }
}
