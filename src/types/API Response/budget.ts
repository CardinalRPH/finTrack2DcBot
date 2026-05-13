import { categoryType } from "./categories";

export type budgetType = {
    budgetData: {
        id: string;
        amount: string;
        monthYear: string;
        category: Omit<categoryType, "id">
        spended: number;
    }[];
    totalSpent: number;
    remaining: number;
    totalBudget: number;
}

export type budgetDate = number