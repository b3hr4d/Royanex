import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../alert';
import { setBlocklistStatus } from '../../blocklistAccess';
import { configsData, configsError } from '../actions';

const configsOptions: RequestOptions = {
    apiVersion: 'sso',
};

export function* configsFetchSaga() {
    try {
        const configs = yield call(API.get(configsOptions), '/identity/configs');
        yield put(configsData(configs));
        yield put(setBlocklistStatus({ status: 'allowed' }));
    } catch (error) {
        yield put(configsError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
