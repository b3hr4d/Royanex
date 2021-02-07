import {call, put} from 'redux-saga/effects';
import {API, RequestOptions} from '../../../../api';
import {userError, userInfoData} from '../actions';

const userOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* userInfoSaga() {
    try {
        const userInfo = yield call(API.get(userOptions), '/account/info');
        yield put(userInfoData({userInfo}));
    } catch (error) {
        yield put(userError(error));
    }
}
