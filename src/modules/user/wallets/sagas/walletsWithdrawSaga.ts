// tslint:disable-next-line
import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import {getCsrfToken} from '../../../../helpers';
import {alertPush} from '../../../index';
import {
    walletsWithdrawCcyData,
    walletsWithdrawCcyError,
    WalletsWithdrawCcyFetch,
    walletsWithdrawRlsData,
    walletsWithdrawRlsError,
    WalletsWithdrawRlsFetch,
} from '../actions';

const walletsWithdrawCcyOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'app',
        headers: {'X-CSRF-Token': csrfToken},
    };
};

export function* walletsWithdrawCcySaga(action: WalletsWithdrawCcyFetch) {
    try {
        yield call(API.post(walletsWithdrawCcyOptions(getCsrfToken())), '/account/withdraws', action.payload);
        yield put(walletsWithdrawCcyData());
        yield put(alertPush({message: ['success.withdraw.action'], type: 'success'}));
    } catch (error) {
        yield put(walletsWithdrawCcyError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}

export function* walletsWithdrawRlsSaga(action: WalletsWithdrawRlsFetch) {
    try {
        yield call(API.post(walletsWithdrawCcyOptions(getCsrfToken())), '/account/withdraws/rls', action.payload);
        yield put(walletsWithdrawRlsData());
        yield put(alertPush({message: ['success.withdraw.action'], type: 'success'}));
    } catch (error) {
        yield put(walletsWithdrawRlsError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
