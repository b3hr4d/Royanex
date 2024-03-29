import { CommonError } from '../../types';
import {
    SET_MOBILE_WALLET_UI,
    WALLETS_ADDRESS_DATA,
    WALLETS_ADDRESS_DATA_WS,
    WALLETS_ADDRESS_ERROR,
    WALLETS_ADDRESS_FETCH,
    WALLETS_ADDRESS_REFETCH,
    WALLETS_DATA,
    WALLETS_DATA_WS,
    WALLETS_ERROR,
    WALLETS_FETCH,
    WALLETS_REFETCH,
    WALLETS_RESET,
    WALLETS_WITHDRAW_CCY_DATA,
    WALLETS_WITHDRAW_CCY_ERROR,
    WALLETS_WITHDRAW_CCY_FETCH,
    WALLETS_WITHDRAW_RLS_DATA,
    WALLETS_WITHDRAW_RLS_ERROR,
    WALLETS_WITHDRAW_RLS_FETCH,
} from './constants';
import {
    Wallet,
    WalletAddress,
    WalletWithdrawCCY,
    WalletWithdrawRls,
} from './types';

export interface WalletsFetch {
    type: typeof WALLETS_FETCH;
}

export interface WalletsReFetch {
    type: typeof WALLETS_REFETCH;
}

export interface WalletsData {
    type: typeof WALLETS_DATA;
    payload: Wallet[];
}

export interface WalletsDataByRanger {
    type: typeof WALLETS_DATA_WS;
    payload: {
        ws: boolean;
        balances;
    };
}

export interface WalletsError {
    type: typeof WALLETS_ERROR;
    payload: CommonError;
}

export interface WalletsReset {
    type: typeof WALLETS_RESET;
}

export interface WalletsAddressFetch {
    type: typeof WALLETS_ADDRESS_FETCH;
    payload: {
        currency: string;
    };
}

export interface WalletsAddressReFetch {
    type: typeof WALLETS_ADDRESS_REFETCH;
    payload: {
        currency: string;
    };
}

export interface WalletsAddressData {
    type: typeof WALLETS_ADDRESS_DATA;
    payload: WalletAddress;
}

export interface WalletsAddressDataWS {
    type: typeof WALLETS_ADDRESS_DATA_WS;
    payload: WalletAddress;
}

export interface WalletsAddressError {
    type: typeof WALLETS_ADDRESS_ERROR;
    payload: CommonError;
}

export interface WalletsWithdrawCcyFetch {
    type: typeof WALLETS_WITHDRAW_CCY_FETCH;
    payload: WalletWithdrawCCY;
}

export interface WalletsWithdrawCcyData {
    type: typeof WALLETS_WITHDRAW_CCY_DATA;
}

export interface WalletsWithdrawCcyError {
    type: typeof WALLETS_WITHDRAW_CCY_ERROR;
    payload: CommonError;
}

export interface SetMobileWalletUi {
    type: typeof SET_MOBILE_WALLET_UI;
    payload: string;
}

export interface WalletsWithdrawRlsFetch {
    type: typeof WALLETS_WITHDRAW_RLS_FETCH;
    payload: WalletWithdrawRls;
}

export interface WalletsWithdrawRlsData {
    type: typeof WALLETS_WITHDRAW_RLS_DATA;
}

export interface WalletsWithdrawRlsError {
    type: typeof WALLETS_WITHDRAW_RLS_ERROR;
    payload: CommonError;
}

export type WalletsAction =
    | WalletsFetch
    | WalletsReFetch
    | WalletsData
    | WalletsDataByRanger
    | WalletsError
    | WalletsAddressFetch
    | WalletsAddressReFetch
    | WalletsAddressData
    | WalletsAddressDataWS
    | WalletsAddressError
    | WalletsWithdrawCcyFetch
    | WalletsWithdrawCcyData
    | WalletsWithdrawCcyError
    | WalletsReset
    | SetMobileWalletUi
    | WalletsWithdrawRlsData
    | WalletsWithdrawRlsFetch
    | WalletsWithdrawRlsError;

export const walletsFetch = (): WalletsFetch => ({
    type: WALLETS_FETCH,
});

export const walletsReFetch = (): WalletsReFetch => ({
    type: WALLETS_REFETCH,
});

export const walletsData = (payload: WalletsData['payload']): WalletsData => ({
    type: WALLETS_DATA,
    payload,
});

export const updateWalletsDataByRanger = (
    payload: WalletsDataByRanger['payload'],
): WalletsDataByRanger => ({
    type: WALLETS_DATA_WS,
    payload,
});

export const walletsError = (
    payload: WalletsError['payload'],
): WalletsError => ({
    type: WALLETS_ERROR,
    payload,
});

export const walletsAddressFetch = (
    payload: WalletsAddressFetch['payload'],
): WalletsAddressFetch => ({
    type: WALLETS_ADDRESS_FETCH,
    payload,
});

export const walletsAddressReFetch = (
    payload: WalletsAddressFetch['payload'],
): WalletsAddressReFetch => ({
    type: WALLETS_ADDRESS_REFETCH,
    payload,
});

export const walletsAddressData = (
    payload: WalletsAddressData['payload'],
): WalletsAddressData => ({
    type: WALLETS_ADDRESS_DATA,
    payload,
});

export const walletsAddressError = (
    payload: WalletsAddressError['payload'],
): WalletsAddressError => ({
    type: WALLETS_ADDRESS_ERROR,
    payload,
});

export const walletsAddressDataWS = (
    payload: WalletsAddressDataWS['payload'],
): WalletsAddressDataWS => ({
    type: WALLETS_ADDRESS_DATA_WS,
    payload,
});

export const walletsWithdrawCcyFetch = (
    payload: WalletsWithdrawCcyFetch['payload'],
): WalletsWithdrawCcyFetch => ({
    type: WALLETS_WITHDRAW_CCY_FETCH,
    payload,
});

export const walletsWithdrawCcyData = (): WalletsWithdrawCcyData => ({
    type: WALLETS_WITHDRAW_CCY_DATA,
});

export const walletsWithdrawCcyError = (
    payload: WalletsWithdrawCcyError['payload'],
): WalletsWithdrawCcyError => ({
    type: WALLETS_WITHDRAW_CCY_ERROR,
    payload,
});

export const walletsReset = (): WalletsReset => ({
    type: WALLETS_RESET,
});

export const setMobileWalletUi = (
    payload: SetMobileWalletUi['payload'],
): SetMobileWalletUi => ({
    type: SET_MOBILE_WALLET_UI,
    payload,
});

export const walletsWithdrawRlsData = (): WalletsWithdrawRlsData => ({
    type: WALLETS_WITHDRAW_RLS_DATA,
});

export const walletsWithdrawRlsFetch = (
    payload: WalletsWithdrawRlsFetch['payload'],
): WalletsWithdrawRlsFetch => ({
    type: WALLETS_WITHDRAW_RLS_FETCH,
    payload,
});

export const walletsWithdrawRlsError = (
    payload: WalletsWithdrawRlsError['payload'],
): WalletsWithdrawRlsError => ({
    type: WALLETS_WITHDRAW_RLS_ERROR,
    payload,
});
