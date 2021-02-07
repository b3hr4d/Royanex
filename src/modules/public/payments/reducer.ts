import { PaymentsAction } from './actions';
import {
    PAYMENTS_DATA,
    PAYMENTS_ERROR,
    PAYMENTS_FETCH,
} from './constants';
import { ErrorObject } from './types';

export interface PaymentsState {
    loading: boolean;
    error: ErrorObject;
}

export const initialPaymentsState: PaymentsState = {
    loading: true,
    error: { message: [], code: 0 },
};

export const paymentsReducer = (state = initialPaymentsState, action: PaymentsAction) => {
    switch (action.type) {
        case PAYMENTS_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case PAYMENTS_DATA:
            return {
                ...state,
                loading: false,
            };
        case PAYMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
