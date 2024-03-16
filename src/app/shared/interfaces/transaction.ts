export class Transaction implements Transaction {
    constructor() {
        this.transaction_id = '';
        this.trade_type = '';
        this.trade_quantity = 0;
        this.execution_timestamp_stamp = new Date();
        this.trade_price = 0;
        this.attachments = [];
        this.why = [];
        this.isin = '';
        this.account_id = '';
        this.brokrage = 0;
        this.open_trade_id = '';
        this.closed_trade_id = '';
    }
}
export interface Transaction {
    transaction_id: string;
    trade_type: string;
    trade_quantity: number;
    execution_timestamp_stamp: Date;
    trade_price: number;
    attachments: string[]; // Array of image URLs or base64 data
    why: string[]; // Array of reasons
    isin: string;
    account_id: string; // Assuming UUID is represented as string
    brokrage: number;
    open_trade_id: string;
    closed_trade_id: string;
}
