import { toNano } from '@ton/core';
import { Loloton } from '../wrappers/Loloton';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const loloton = provider.open(await Loloton.fromInit());

    await loloton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(loloton.address);

    // run methods on `loloton`
}
