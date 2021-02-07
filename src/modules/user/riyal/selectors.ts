import {CardVerifyData, RootState} from '../../';
import {CommonError} from '../../types';
import {Card} from './types';

export const selectCards = (state: RootState): Card[] =>
    state.user.cards.cards.list;

export const selectCardLoading = (state: RootState): boolean =>
    state.user.cards.cards.loading;

export const addCardPost = (state: RootState): Card[] =>
    state.user.cards.cards.list;

export const selectCardsError = (state: RootState): CommonError | undefined =>
    state.user.cards.cards.error;

export const selectedCart = (state: RootState): string =>
    state.user.cards.cards.selectedCart;

export const selectedCardVerifyData = (state: RootState): CardVerifyData =>
    state.user.cards.cards.verify;
