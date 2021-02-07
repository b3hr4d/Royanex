import { CommonError } from '../../types';
import {
    CARD_VERIFY,
    CARD_VERIFY_DATA,
    CARD_VERIFY_ERROR,
    CARDS_DATA,
    CARDS_ERROR,
    CARDS_FETCH,
    CART_POST,
    CART_SINGLE_FETCH,
    GETAWAY_DATA,
    GETAWAY_ERROR,
    GETAWAY_FETCH,
} from './constants';
import { Card, CardVerifyData, CardVerifyPost } from './types';

export interface CardVerifyPostAction {
    type: typeof CARD_VERIFY;
    payload: CardVerifyPost;
}

export interface CardVerifyDataAction {
    type: typeof CARD_VERIFY_DATA;
    payload: CardVerifyData;
}

export interface CardVerifyErrorAction {
    type: typeof CARD_VERIFY_ERROR;
}

export interface CardsFetch {
    type: typeof CARDS_FETCH;
}

export interface CartSingleFetch {
    type: typeof CART_SINGLE_FETCH;
    payload: Card;
}

export interface CartPostData {
    type: typeof CART_POST;
    payload: Card;
}

export interface CardsData {
    type: typeof CARDS_DATA;
    payload: Card[];
}

export interface CardsError {
    type: typeof CARDS_ERROR;
    payload: CommonError;
}

export interface GetawayFetch {
    type: typeof GETAWAY_FETCH;
    payload: any;
}

export interface GetawayData {
    type: typeof GETAWAY_DATA;
    payload: any;
}

export interface GetawayError {
    type: typeof GETAWAY_ERROR;
    payload: CommonError;
}

export type CardsAction =
    | CardsFetch
    | CardsData
    | CardVerifyPostAction
    | CardVerifyDataAction
    | CardVerifyErrorAction
    | CardsError
    | CartPostData
    | CartSingleFetch;

export const cardVerifyPost = (
    payload: CardVerifyPostAction['payload'],
): CardVerifyPostAction => ({
    type: CARD_VERIFY,
    payload,
});

export const cardVerifyData = (
    payload: CardVerifyDataAction['payload'],
): CardVerifyDataAction => ({
    type: CARD_VERIFY_DATA,
    payload,
});

export const cardVerifyError = (): CardVerifyErrorAction => ({
    type: CARD_VERIFY_ERROR,
});

export const cardsFetch = (): CardsFetch => ({
    type: CARDS_FETCH,
});

export const cartPost = (payload: Card): CartPostData => ({
    type: CART_POST,
    payload,
});

export const cartSingleData = (payload: Card): CartSingleFetch => ({
    type: CART_SINGLE_FETCH,
    payload,
});

export const cardsData = (payload: CardsData['payload']): CardsData => ({
    type: CARDS_DATA,
    payload,
});

export const cardsError = (payload: CardsError['payload']): CardsError => ({
    type: CARDS_ERROR,
    payload,
});

export const getawayFetch = (
    payload: GetawayFetch['payload'],
): GetawayFetch => ({
    type: GETAWAY_FETCH,
    payload,
});

export const getawayData = (payload: GetawayData['payload']): GetawayData => ({
    type: GETAWAY_DATA,
    payload,
});

export const getawayError = (
    payload: GetawayError['payload'],
): GetawayError => ({
    type: GETAWAY_ERROR,
    payload,
});
