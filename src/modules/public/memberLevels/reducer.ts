import {CommonState} from '../../types';
import {MemberLevelsAction} from './actions';
import {
    MEMBER_LEVELS_DATA,
    MEMBER_LEVELS_ERROR,
    MEMBER_LEVELS_FETCH,
    TRADING_FEES_DATA,
    TRADING_FEES_FETCH,
} from './constants';
import {MemberLevels, TradingFees} from './types';

export interface MemberLevelsState extends CommonState {
    levels?: MemberLevels;
    tradingFees?: TradingFees;
    loading: boolean;
}

export const initialMemberLevelsState: MemberLevelsState = {
    loading: false,
};

export const memberLevelsReducer = (state = initialMemberLevelsState, action: MemberLevelsAction) => {
    switch (action.type) {
        case MEMBER_LEVELS_FETCH:
            return {
                ...state,
                loading: true,
            };
        case MEMBER_LEVELS_DATA:
            return {
                ...state,
                loading: false,
                levels: action.payload,
            };
        case MEMBER_LEVELS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case TRADING_FEES_FETCH:
            return {
                ...state,
                loading: true,
            };
        case TRADING_FEES_DATA:
            return {
                ...state,
                loading: false,
                tradingFees: action.payload,
            };
        default:
            return state;
    }
};
