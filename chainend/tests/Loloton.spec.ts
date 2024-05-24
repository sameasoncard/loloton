import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Loloton } from '../wrappers/Loloton';
import '@ton/test-utils';

describe('Loloton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let loloton: SandboxContract<Loloton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loloton = blockchain.openContract(await Loloton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await loloton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: loloton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and loloton are ready to use
    });
});
