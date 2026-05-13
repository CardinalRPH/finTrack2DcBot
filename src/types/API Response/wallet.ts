export type walletType = {
    name: string;
    id: string;
    type: walletEnumType;
    balance: string;
}

export type walletEnumType = "CASH" | "E_WALLET" | "BANK";