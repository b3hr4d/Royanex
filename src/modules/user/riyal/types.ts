export interface Card {
    id?: string;
    card_num: string;
    acc_num: string;
    shaba: string;
    bank_name: string;
    verify?: boolean;
}

export interface CardVerifyPost {
    card_num: string;
}

export interface CardVerifyData {
    shaba: string;
    name: string;
    error:boolean;
}
