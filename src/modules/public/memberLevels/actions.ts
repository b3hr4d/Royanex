import {
    MEMBER_LEVELS_DATA,
    MEMBER_LEVELS_ERROR,
    MEMBER_LEVELS_FETCH,
    TRADING_FEES_DATA,
    TRADING_FEES_FETCH,
} from './constants';
import {MemberLevels, TradingFees} from './types';

export interface MemberLevelsFetch {
    type: typeof MEMBER_LEVELS_FETCH;
}

export interface MemberLevelsData {
    type: typeof MEMBER_LEVELS_DATA;
    payload: MemberLevels;
}

export interface TradingFeesFetch {
    type: typeof TRADING_FEES_FETCH;
}

export interface TradingFeesData {
    type: typeof TRADING_FEES_DATA;
    payload: TradingFees;
}

export interface MemberLevelsError {
    type: typeof MEMBER_LEVELS_ERROR;
}

export type MemberLevelsAction =
    MemberLevelsFetch
    | MemberLevelsData
    | TradingFeesData
    | TradingFeesFetch
    | MemberLevelsError;

export const memberLevelsFetch = (): MemberLevelsFetch => ({
    type: MEMBER_LEVELS_FETCH,
});

export const memberLevelsData = (payload: MemberLevelsData['payload']): MemberLevelsData => ({
    type: MEMBER_LEVELS_DATA,
    payload,
});

export const memberLevelsError = (): MemberLevelsError => ({
    type: MEMBER_LEVELS_ERROR,
});

export const tradingFeesFetch = (): TradingFeesFetch => ({
    type: TRADING_FEES_FETCH,
});

export const tradingFeesData = (payload: TradingFeesData['payload']): TradingFeesData => ({
    type: TRADING_FEES_DATA,
    payload,
});
