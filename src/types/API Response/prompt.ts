import { transType } from "./createRecord";
import { walletEnumType } from "./wallet";

export type prompType = {
    type: transType;
    amount: number | string;
    date: Date;
    description: string | null;
    isInvestment: boolean;
    wallet: {
        type: walletEnumType;
        name: string;
        balance: number | string;
    };
    category: {
        name: string;
        icon: string;
        color: string;
    } | null;
    investment: {
        provider: string;
        assetName: string;
        totalInvestment: number | string;
    } | null;
    toWallet: {
        type: walletEnumType;
        name: string;
        balance: number | string;
    } | null;
}