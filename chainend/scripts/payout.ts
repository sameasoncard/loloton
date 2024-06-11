import { toNano, fromNano } from '@ton/core';
import { Loloton } from '../wrappers/Loloton';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const loloton = provider.open(await Loloton.fromInit(600n, 1000n, toNano("1"), 80n));

    await loloton.send(
        provider.sender(),
        {
            value: toNano('0.02'),
        },
        "payout"
    );
}
