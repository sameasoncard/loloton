import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell,
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type LotteryRound = {
    $$type: 'LotteryRound';
    addresses: Dictionary<bigint, Address>;
    amount: bigint;
    minNumberOfSecondsPerRound: bigint;
    lastWinnerAddress: Address;
    startedAt: bigint;
}

export function storeLotteryRound(src: LotteryRound) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.addresses, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeUint(src.amount, 32);
        b_0.storeUint(src.minNumberOfSecondsPerRound, 32);
        b_0.storeAddress(src.lastWinnerAddress);
        b_0.storeUint(src.startedAt, 32);
    };
}

export function loadLotteryRound(slice: Slice) {
    let sc_0 = slice;
    let _addresses = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _amount = sc_0.loadUintBig(32);
    let _minNumberOfSecondsPerRound = sc_0.loadUintBig(32);
    let _lastWinnerAddress = sc_0.loadAddress();
    let _startedAt = sc_0.loadUintBig(32);
    return { $$type: 'LotteryRound' as const, addresses: _addresses, amount: _amount, minNumberOfSecondsPerRound: _minNumberOfSecondsPerRound, lastWinnerAddress: _lastWinnerAddress, startedAt: _startedAt };
}

function loadTupleLotteryRound(source: TupleReader) {
    let _addresses = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _amount = source.readBigNumber();
    let _minNumberOfSecondsPerRound = source.readBigNumber();
    let _lastWinnerAddress = source.readAddress();
    let _startedAt = source.readBigNumber();
    return { $$type: 'LotteryRound' as const, addresses: _addresses, amount: _amount, minNumberOfSecondsPerRound: _minNumberOfSecondsPerRound, lastWinnerAddress: _lastWinnerAddress, startedAt: _startedAt };
}

function storeTupleLotteryRound(source: LotteryRound) {
    let builder = new TupleBuilder();
    builder.writeCell(source.addresses.size > 0 ? beginCell().storeDictDirect(source.addresses, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.minNumberOfSecondsPerRound);
    builder.writeAddress(source.lastWinnerAddress);
    builder.writeNumber(source.startedAt);
    return builder.build();
}

function dictValueParserLotteryRound(): DictionaryValue<LotteryRound> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLotteryRound(src)).endCell());
        },
        parse: (src) => {
            return loadLotteryRound(src.loadRef().beginParse());
        }
    }
}

 type Loloton_init_args = {
    $$type: 'Loloton_init_args';
    minNumberOfSecondsPerRound: bigint;
    maxNumberOfAdressesPerRound: bigint;
    lotteryTicketPrice: bigint;
    percentPayToWinner: bigint;
}

function initLoloton_init_args(src: Loloton_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.minNumberOfSecondsPerRound, 257);
        b_0.storeInt(src.maxNumberOfAdressesPerRound, 257);
        b_0.storeInt(src.lotteryTicketPrice, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.percentPayToWinner, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function Loloton_init(minNumberOfSecondsPerRound: bigint, maxNumberOfAdressesPerRound: bigint, lotteryTicketPrice: bigint, percentPayToWinner: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLoloton_init_args({ $$type: 'Loloton_init_args', minNumberOfSecondsPerRound, maxNumberOfAdressesPerRound, lotteryTicketPrice, percentPayToWinner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Loloton_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    13126: { message: `Lottery is stopped now. Please, come later` },
    23519: { message: `You are already in playing list` },
    33004: { message: `No space for new user in current lottery round, please, wait` },
    39937: { message: `Incorrect TON amount to play in lottery` },
    40368: { message: `Contract stopped` },
    46033: { message: `Current lottery round cannot be completed yet` },
    48182: { message: `No users want to play in current lottery round` },
    53296: { message: `Contract not stopped` },
}

const Loloton_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LotteryRound","header":null,"fields":[{"name":"addresses","type":{"kind":"dict","key":"int","value":"address"}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"minNumberOfSecondsPerRound","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastWinnerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"startedAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const Loloton_getters: ABIGetter[] = [
    {"name":"version","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"numberOfFinishedLotteryRounds","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"maxNumberOfAdressesPerRound","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lotteryTicketPrice","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"percentPayToWinner","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"lotteryRound","arguments":[],"returnType":{"kind":"simple","type":"LotteryRound","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const Loloton_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"play"}},
    {"receiver":"internal","message":{"kind":"text","text":"payout"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class Loloton implements Contract {
    
    static async init(minNumberOfSecondsPerRound: bigint, maxNumberOfAdressesPerRound: bigint, lotteryTicketPrice: bigint, percentPayToWinner: bigint) {
        return await Loloton_init(minNumberOfSecondsPerRound, maxNumberOfAdressesPerRound, lotteryTicketPrice, percentPayToWinner);
    }
    
    static async fromInit(minNumberOfSecondsPerRound: bigint, maxNumberOfAdressesPerRound: bigint, lotteryTicketPrice: bigint, percentPayToWinner: bigint) {
        const init = await Loloton_init(minNumberOfSecondsPerRound, maxNumberOfAdressesPerRound, lotteryTicketPrice, percentPayToWinner);
        const address = contractAddress(0, init);
        return new Loloton(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Loloton(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Loloton_types,
        getters: Loloton_getters,
        receivers: Loloton_receivers,
        errors: Loloton_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'play' | 'payout' | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'play') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'payout') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getVersion(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('version', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getNumberOfFinishedLotteryRounds(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numberOfFinishedLotteryRounds', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaxNumberOfAdressesPerRound(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('maxNumberOfAdressesPerRound', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getLotteryTicketPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lotteryTicketPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPercentPayToWinner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('percentPayToWinner', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getLotteryRound(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lotteryRound', builder.build())).stack;
        const result = loadTupleLotteryRound(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}