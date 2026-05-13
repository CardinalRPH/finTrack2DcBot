
export interface MappedResult {
    id: string;
    name: string;
    color?: string | null;
    icon?: string | null;
    type: 'INCOME' | 'OUTCOME';
    amount: number;
}

export type spendingType = {
    byWallet: {
        topExpense: MappedResult[];
        topIncome: MappedResult[];
    };
    byCategory: {
        topExpense: MappedResult[];
        topIncome: MappedResult[];
    };
}