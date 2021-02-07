// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import {CARD_VERIFY, CARDS_FETCH, CART_POST,GETAWAY_FETCH} from '../constants';
import {cardVerifySaga, cartSaga,getawaySaga} from './getawaySaga';
import {riyalSaga} from './riyalSaga';


export function* rootRiyalsSaga() {
    yield takeEvery(CARDS_FETCH, riyalSaga);
    yield takeEvery(GETAWAY_FETCH, getawaySaga);
    yield takeEvery(CART_POST, cartSaga);
    yield takeEvery(CARD_VERIFY, cardVerifySaga);
}
