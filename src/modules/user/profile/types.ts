import {Label} from '../kyc';

export interface UserProfile {
    first_name: string;
    last_name: string;
    dob: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    state: string;
    created_at: string;
    updated_at: string;
    metadata?: string;
}

export interface Phone {
    country: string;
    number: string;
    validated_at: string | null;
}

export interface User {
    email: string;
    level: number;
    otp: boolean;
    role: string;
    state: string;
    uid: string;
    nid?: string;
    profiles: UserProfile[];
    csrf_token?: string;
    data?: string;
    referal_uid: string | null;
    labels: Label[];
    phone?: string;
    phones: Phone[];
    created_at: string;
    updated_at: string;
}

export interface Accounts {
    currency: string;
    balance: string;
    locked: string;
}

export interface UserInfoType {
    uid: string;
    full_name: string;
    mobile: string;
    group: string;
    nid: string;
    email: string;
    accounts: Accounts[];
}
