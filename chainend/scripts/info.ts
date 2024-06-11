import { toNano, fromNano } from '@ton/core';
import { Loloton } from '../wrappers/Loloton';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const loloton = provider.open(await Loloton.fromInit(600n, 1000n, toNano("1"), 80n));

    const lotteryRound = await loloton.getLotteryRound();
    const balance = await loloton.getBalance();

    console.log(`balance: ${fromNano(balance)} TONs`);
    console.log(`lottery round state`);
    console.log(` - size: ${lotteryRound.addresses.size}`);
    console.log(` - amount: ${lotteryRound.amount}`);
    console.log(` - startedAt: ${new Date(Number(lotteryRound.startedAt) * 1000)}, ${lotteryRound.startedAt}`);
    //
}
