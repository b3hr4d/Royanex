// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { walletsData, walletsError } from '../actions';

const walletsOptions: RequestOptions = {
    apiVersion: 'app',
};

const currenciesOptions: RequestOptions = {
    apiVersion: 'app',
};

export function* walletsSaga() {
    try {
        const accounts = yield call(
            API.get(walletsOptions),
            '/account/balances',
        );
        const currencies = yield call(
            API.get(currenciesOptions),
            '/public/currencies',
        );

        yield call(API.get(currenciesOptions), '/account/deposits/fix');
        const accountsByCurrencies = currencies.map((currency) => {
            let walletInfo = accounts.find(
                (wallet) => wallet.currency === currency.id,
            );

            if (!walletInfo) {
                walletInfo = {
                    currency: currency.id,
                };
            }

            return {
                ...walletInfo,
                name: currency.name,
                explorerTransaction: currency!.explorer_transaction,
                explorerAddress: currency!.explorer_address,
                fee: currency!.withdraw_fee,
                type: currency!.type,
                fixed: currency!.precision,
                iconUrl: currency.icon_url,
            };
        });

        yield put(walletsData(accountsByCurrencies));
    } catch (error) {
        yield put(walletsError(error));
        yield put(
            alertPush({
                message: error.message,
                code: error.code,
                type: 'error',
            }),
        );
    }
}
