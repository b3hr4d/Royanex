import { CommonError } from '../../types';

export interface Wallet {
    balance?: string;
    currency: string;
    loading: boolean;
    name: string;
    type: 'fiat' | 'coin';
    fee: number;
    address?: string;
    locked?: string;
    explorerTransaction: string;
    explorerAddress: string;
    fixed: number;
    iconUrl?: string;
}
export interface WalletListDetails {
    loading: boolean;
    withdrawSuccess: boolean;
    error?: CommonError;
    mobileWalletChosen: string;
    selectedWalletCurrency: string;
    selectedWalletAddress: string;
    timestamp?: number;
}
export interface WalletAddress {
    address: string;
    currency: string;
}

export interface WalletWithdrawCCY {
    amount: string;
    currency: string;
    otp: string;
    beneficiary_id: string;
}

export interface WalletWithdrawFiat {
    amount: string;
    currency: string;
    currency_type: string;
    otp: string;
    beneficiary_id: string;
}

export interface AccountInterface {
    currency: string;
    balance?: string;
    locked?: string;
}

export interface WalletWithdrawRls {
    otp: string;
    acc_num: string;
    amount: string;
    note?: string;
}
