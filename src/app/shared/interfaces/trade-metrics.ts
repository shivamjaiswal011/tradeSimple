export class TradeMetric implements TradeMetric {
    constructor() {
        this.totalProfit = 0;
        this.totalTrades = 0;
        this.expectancy = 0;
        this.avgHoldingTime = 0;
        this.profitFactor = 0;
        this.grossProfit = 0;
        this.grossLoss = 0;
        this.totalWinner = 0;
        this.totalLooser = 0;
        this.winPercentage = 0;
    }
}
export interface TradeMetric {
    totalProfit: number;
    totalTrades: number;
    expectancy: number;
    avgHoldingTime: number;
    profitFactor: number;
    grossProfit: number;
    grossLoss: number;
    totalWinner: number;
    totalLooser: number;
    winPercentage: number;
}