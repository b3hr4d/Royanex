import {takeLatest} from 'redux-saga/effects';
import {MEMBER_LEVELS_FETCH, TRADING_FEES_FETCH} from '../constants';
import {memberLevelsSaga} from './memberLevelsSaga';
import {tradingFeesSaga} from './tradingFeesSaga';

export function* rootMemberLevelsSaga() {
    yield takeLatest(MEMBER_LEVELS_FETCH, memberLevelsSaga);
    yield takeLatest(TRADING_FEES_FETCH, tradingFeesSaga);
}
