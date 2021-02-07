
import { RootState } from '../../index';
import { PaymentsState } from './reducer';
import { ErrorObject } from './types';

const selectPaymentsState = (state: RootState): PaymentsState => state.public.payments;

export const selectPaymentsLoading = (state: RootState): boolean | undefined =>
    selectPaymentsState(state).loading;

export const selectPaymentsError = (state: RootState): ErrorObject =>
    selectPaymentsState(state).error;
