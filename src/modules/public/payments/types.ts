export interface Payments {
    status: string;
}

export interface QueryObject {
    code: string;
    refnum: string;
    amount?: string;
    state?: string;
}

export interface ErrorObject {
    code: number;
    message: string[];
}

