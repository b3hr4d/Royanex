import {RootState} from '../../index';
import {MemberLevels, TradingFees} from './types';

export const selectMemberLevels = (state: RootState): MemberLevels | undefined =>
    state.public.memberLevels.levels;

export const selectMemberLevelsLoading = (state: RootState): boolean =>
    state.public.memberLevels.loading;

export const selectTradingFees = (state: RootState): TradingFees | undefined =>
    state.public.memberLevels.tradingFees;
