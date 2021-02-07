export interface MemberLevels {
    deposit: { minimum_level: number };
    withdraw: { minimum_level: number };
    trading: { minimum_level: number };
}

export interface TradingFees{
    id:string;
    group:string;
    market_id:string;
    maker:string;
    taker:string;
    created_at:string;
    updated_at:string;
}
