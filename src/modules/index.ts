import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { publicReducer, userReducer } from './app';
import { rootHandleAlertSaga } from './public/alert';
import { rootBlocklistAccessSaga } from './public/blocklistAccess';
import { rootConfigsSaga } from './public/configs';
import { rootCurrenciesSaga } from './public/currencies';
import { rootCustomizationSaga } from './public/customization';
import { rootKlineFetchSaga } from './public/kline';
import { rootMarketsSaga } from './public/markets';
import { rootMemberLevelsSaga } from './public/memberLevels';
import {
    rootOrderBookSaga,
} from './public/orderBook';
import { rootPaymentsSaga } from './public/payments';
import { rootRecentTradesSaga } from './public/recentTrades';
import { rootApiKeysSaga } from './user/apiKeys/sagas';
import { rootAuthSaga } from './user/auth';
import { rootBeneficiariesSaga } from './user/beneficiaries';
import { rootGeetestCaptchaSaga } from './user/captcha';
import { rootCustomizationUpdateSaga } from './user/customization';
import { rootEmailVerificationSaga } from './user/emailVerification';
import { rootHistorySaga } from './user/history';
import { rootSendAddressesSaga } from './user/kyc/addresses';
import { rootSendDocumentsSaga } from './user/kyc/documents';
import { rootSendIdentitySaga } from './user/kyc/identity';
import { rootLabelSaga } from './user/kyc/label';
import { rootSendCodeSaga } from './user/kyc/phone';
import { rootNewHistorySaga } from './user/newHistory';
import { rootOpenOrdersSaga } from './user/openOrders';
import { rootOrdersSaga } from './user/orders';
import { rootOrdersHistorySaga } from './user/ordersHistory';
import { rootPasswordSaga } from './user/password';
import { rootProfileSaga } from './user/profile';
import { rootRiyalsSaga } from './user/riyal/sagas';
import { rootUserActivitySaga} from './user/userActivity';
import { rootWalletsSaga} from './user/wallets';
import { rootWithdrawLimitSaga} from './user/withdrawLimit';


export * from './public/markets';
export * from './public/orderBook';
export * from './public/globalSettings';
export * from './public/configs';
export * from './public/currencies';
export * from './public/customization';
export * from './public/i18n';
export * from './public/kline';
export * from './public/alert';
export * from './user/apiKeys';
export * from './user/auth';
export * from './user/beneficiaries';
export * from './user/captcha';
export * from './user/customization';
export * from './user/wallets';
export * from './user/profile';
export * from './user/openOrders';
export * from './user/orders';
export * from './user/ordersHistory';
export * from './user/password';
export * from './user/userActivity';
export * from './user/history';
export * from './user/newHistory';
export * from './user/kyc';
export * from './user/emailVerification';
export * from './user/withdrawLimit';
export * from './public/memberLevels';
export * from './public/blocklistAccess';
export * from './user/riyal';

// HACK: Can simply use blow code and write less also fix some error
export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    public: publicReducer,
    user: userReducer,
});

export function* rootSaga() {
    yield all([
        call(rootApiKeysSaga),
        call(rootAuthSaga),
        call(rootBeneficiariesSaga),
        call(rootBlocklistAccessSaga),
        call(rootConfigsSaga),
        call(rootCurrenciesSaga),
        call(rootPaymentsSaga),
        call(rootCustomizationSaga),
        call(rootCustomizationUpdateSaga),
        call(rootEmailVerificationSaga),
        call(rootGeetestCaptchaSaga),
        call(rootHandleAlertSaga),
        call(rootHistorySaga),
        call(rootKlineFetchSaga),
        call(rootLabelSaga),
        call(rootMarketsSaga),
        call(rootMemberLevelsSaga),
        call(rootNewHistorySaga),
        call(rootOpenOrdersSaga),
        call(rootOrderBookSaga),
        call(rootOrdersHistorySaga),
        call(rootOrdersSaga),
        call(rootPasswordSaga),
        call(rootProfileSaga),
        call(rootRecentTradesSaga),
        call(rootSendCodeSaga),
        call(rootSendAddressesSaga),
        call(rootSendDocumentsSaga),
        call(rootSendIdentitySaga),
        call(rootUserActivitySaga),
        call(rootWalletsSaga),
        call(rootWithdrawLimitSaga),
        call(rootRiyalsSaga),
    ]);
}
