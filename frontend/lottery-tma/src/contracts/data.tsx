export interface ContractInfo {
    url: string;
    address: string;
    percent: number;
    seconds: number;
}

export const ContractsInfo: { [key: string]: ContractInfo } = {
    "1": {
        url: "https://testnet.tonscan.org/address/EQCSbZH-qqj3IjHADY6tk87tlT_wohnFsnJuHsWEy_HQkcvU",
        address: "EQCSbZH-qqj3IjHADY6tk87tlT_wohnFsnJuHsWEy_HQkcvU",
        percent: 80,
        seconds: 600,
    },
    "10": {
        url: "https://testnet.tonscan.org/address/",
        address: "",
        percent: 80,
        seconds: 600,
    },
};