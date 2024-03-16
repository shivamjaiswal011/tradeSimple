export class ClosedTrade implements ClosedTrade {
    constructor() {
        this.trade_id = '';
        this.account_id = '';
        this.quantity = 0;
        this.open_timestamp = new Date();
        this.close_timestamp = new Date();
        this.one_r = 0;
        this.avg_buy_price = 0;
        this.avg_sell_price = 0;
        this.isin = '';
        this.rating = 0;
        this.position = '';
    }
}

export interface ClosedTrade {
    trade_id: string;
    account_id: string; // Assuming UUID is represented as string
    quantity: number;
    open_timestamp: Date;
    close_timestamp: Date;
    one_r: number;
    rating: number;
    avg_buy_price: number;
    avg_sell_price: number;
    isin: string;
    position: string;
}
