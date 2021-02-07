import {
    PAYMENTS_DATA,
    PAYMENTS_ERROR,
    PAYMENTS_FETCH,
} from './constants';
import { ErrorObject, QueryObject } from './types';

export interface PaymentsFetch {
    type: typeof PAYMENTS_FETCH;
    payload: QueryObject;
}

export interface PaymentsData {
    type: typeof PAYMENTS_DATA;
}

export interface PaymentsError {
    type: typeof PAYMENTS_ERROR;
    error: ErrorObject;
}

export type PaymentsAction =
    PaymentsFetch
    | PaymentsData
    | PaymentsError;

export const paymentsFetch = (payload: PaymentsFetch['payload']): PaymentsFetch => ({
    type: PAYMENTS_FETCH,
    payload,
});

export const paymentsData = (): PaymentsData => ({
    type: PAYMENTS_DATA,
});

export const paymentsError = (error: PaymentsError['error']): PaymentsError => ({
    type: PAYMENTS_ERROR,
    error,
});
