import {CommonError} from '../../types';
import {CardsAction} from './actions';
import {CARD_VERIFY, CARD_VERIFY_DATA, CARD_VERIFY_ERROR, CARDS_DATA, CARDS_ERROR, CARDS_FETCH} from './constants';
import {Card, CardVerifyData} from './types';


export interface CardState {
    cards: {
        list: Card[];
        verify: CardVerifyData;
        loading: boolean;
        error?: CommonError;
        selectedCart: string;
    };
}

export interface CardVerifyState {
    shaba: string;
    name: string;
    error: boolean;
}

export const initialCardState: CardState = {
    cards: {
        list: [],
        verify: {
            shaba: '',
            name: '',
            error: false,
        },
        loading: false,
        selectedCart: '',
    },
};

export const initialCardVerifyDataState: CardVerifyState = {
    shaba: '',
    name: '',
    error: false,
};

const cardsListReducer = (state: CardState['cards'], action: CardsAction): CardState['cards'] => {
    switch (action.type) {
        case CARD_VERIFY_DATA:
            return {
                ...state,
                verify: {...action.payload, error: false},
            };
        case CARD_VERIFY_ERROR:
            return {
                ...state,
                verify: {...state.verify, error: true},
            };
        case CARDS_FETCH:
            return {
                ...state,
                loading: true,
            };

        case CARDS_DATA: {
            const list = [...action.payload];

            return {
                ...state,
                loading: false,
                list,
            };
        }
        default:
            return state;
    }
};

export const cardsReducer = (state = initialCardState, action: CardsAction): CardState => {
    switch (action.type) {
        case CARD_VERIFY:
        case CARD_VERIFY_DATA:
            const cardVerifyData = {...state.cards};

            return {
                ...state,
                cards: cardsListReducer(cardVerifyData, action),
            };
        case CARD_VERIFY_ERROR:
            const cardVerifyError = {...state.cards};

            return {
                ...state,
                cards: cardsListReducer(cardVerifyError, action),
            };
        case CARDS_FETCH:
        case CARDS_DATA:
        case CARDS_ERROR:
            const cardsListState = {...state.cards};

            return {
                ...state,
                cards: cardsListReducer(cardsListState, action),
            };
        default:
            return state;
    }
};

