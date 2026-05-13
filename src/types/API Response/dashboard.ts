import { categoryType } from "./categories";
import { transType } from "./createRecord";
import { walletEnumType } from "./wallet";

export type dashboardType = {
    totalBalance: number;
    monthlyIncome: number;
    monthlyOutcome: number;
    totalInvest: number
    recentTransactions: {
        date: Date;
        type: transType;
        amount: number;
        description: string | null;
        toWallet: {
            type: walletEnumType;
            name: string;
        } | null;
        category: Omit<categoryType, "id"> | null;
        investment: {
            provider: string;
            assetName: string;
        } | null;
    }[];

}