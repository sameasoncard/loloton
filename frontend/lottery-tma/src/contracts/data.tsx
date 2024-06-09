export interface ContractInfo {
    url: string;
    address: string;
    amount: string;
    percent: number;
    seconds: number;
}

export const ContractsInfo: { [key: string]: ContractInfo } = {
    "1": {
        url: "https://testnet.tonscan.org/address/EQCSbZH-qqj3IjHADY6tk87tlT_wohnFsnJuHsWEy_HQkcvU",
        address: "EQCSbZH-qqj3IjHADY6tk87tlT_wohnFsnJuHsWEy_HQkcvU",
        amount: "1000000000",
        percent: 80,
        seconds: 600,
    },
    "10": {
        url: "https://testnet.tonscan.org/address/",
        address: "",
        amount: "10000000000",
        percent: 80,
        seconds: 600,
    },
    "100": {
        url: "https://testnet.tonscan.org/address/",
        address: "",
        amount: "10000000000",
        percent: 80,
        seconds: 600,
    },
};