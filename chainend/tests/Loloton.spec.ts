import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Loloton } from '../wrappers/Loloton';
import '@ton/test-utils';

describe('Loloton', () => {
    let blockchain: Blockchain;
    let loloton: SandboxContract<Loloton>;

    let deployer: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user2: SandboxContract<TreasuryContract>;

    let lotteryTicketPriceInTONs: number = 1,
        minNumberOfSecondsPerRound: bigint = 60n, 
        maxNumberOfAdressesPerRound: bigint = 1000n, 
        lotteryTicketPrice: bigint = toNano(lotteryTicketPriceInTONs), 
        percentPayToWinner: bigint = 80n;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        loloton = blockchain.openContract(await Loloton.fromInit(
            minNumberOfSecondsPerRound, maxNumberOfAdressesPerRound, lotteryTicketPrice, percentPayToWinner));

        deployer = await blockchain.treasury('deployer');
        user1 = await blockchain.treasury('user1');
        user2 = await blockchain.treasury('user2');

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

    it('should has correct init contract state', async () => {
        expect(await loloton.getVersion()).toBe("1.0.1");
        expect(await loloton.getBalance()).toBe(0n);
        expect(await loloton.getNumberOfFinishedLotteryRounds()).toBe(0n);
        expect(await loloton.getMaxNumberOfAdressesPerRound()).toBe(maxNumberOfAdressesPerRound);
        expect(await loloton.getLotteryTicketPrice()).toBe(lotteryTicketPrice);
        expect(await loloton.getPercentPayToWinner()).toBe(percentPayToWinner);
        expect(await loloton.getStopped()).toBeFalsy();
    });

    it('should has correct init lottery state', async () => {
        const lotteryRound = await loloton.getLotteryRound();

        expect(lotteryRound.addresses.size).toBe(0);
        expect(lotteryRound.amount).toBe(0n);
        expect(lotteryRound.minNumberOfSecondsPerRound).toBe(minNumberOfSecondsPerRound);
        expect(lotteryRound.startedAt).toBeLessThanOrEqual(Date.now());
    });

    it('should not play with transaction contains little tons', async () => {
        let result = await loloton.send(
            deployer.getSender(),
            {
                value: toNano("0.1"),
            },
            "play"
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            on: loloton.address,
            success: false
        });
    });

    it('should not play with transaction contains much tons', async () => {
        let result = await loloton.send(
            deployer.getSender(),
            {
                value: toNano("2"),
            },
            "play"
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            on: loloton.address,
            success: false
        });
    });

    it('should not play when stopped', async () => {
        expect(await loloton.getStopped()).toBeFalsy();

        let result = await loloton.send(
            deployer.getSender(),
            {
                value: toNano("0.1"),
            },
            "Stop"
        );

        expect(await loloton.getStopped()).toBeTruthy();

        result = await loloton.send(
            deployer.getSender(),
            {
                value: lotteryTicketPrice,
            },
            "play"
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            on: loloton.address,
            success: false
        });
    });

    it('should play', async () => {
        let result = await loloton.send(
            deployer.getSender(),
            {
                value: lotteryTicketPrice,
            },
            "play"
        );

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            on: loloton.address,
            success: true
        });
    });

    it('should play and change state', async () => {
        let result = await loloton.send(
            deployer.getSender(),
            {
                value: lotteryTicketPrice,
            },
            "play"
        );

        //console.log(printTransactionFees(result.transactions));

        expect(result.transactions).toHaveTransaction({
            from: deployer.address,
            on: loloton.address,
            success: true,
            outMessagesCount: 0
        });

        const totalFeesInNanoTONs = result.transactions[1].totalFees["coins"];

        const lotteryRound = await loloton.getLotteryRound(),
            balance = await loloton.getBalance();
        
        expect(lotteryRound.addresses.size).toBe(1);
        expect(lotteryRound.amount).toBe(1n);
        expect(lotteryRound.minNumberOfSecondsPerRound).toBe(minNumberOfSecondsPerRound);
        expect(lotteryRound.startedAt).toBeLessThanOrEqual(Date.now());
        expect(lotteryTicketPrice - balance).toBe(totalFeesInNanoTONs);
    });

    it('should several users play', async () => {
        let user1PlayResult = await loloton.send(
            user1.getSender(),
            {
                value: lotteryTicketPrice,
            },
            "play"
        );

        expect(user1PlayResult.transactions).toHaveTransaction({
            from: user1.address,
            on: loloton.address,
            success: true,
            outMessagesCount: 0
        });

        let lotteryRound = await loloton.getLotteryRound(),
            balance = await loloton.getBalance();
        
        expect(lotteryRound.addresses.size).toBe(1);
        expect(lotteryRound.amount).toBe(1n);
        expect(lotteryRound.minNumberOfSecondsPerRound).toBe(minNumberOfSecondsPerRound);
        expect(lotteryRound.startedAt).toBeLessThanOrEqual(Date.now());
        expect(lotteryTicketPrice - balance).toBe(user1PlayResult.transactions[1].totalFees["coins"]);

        // second user play

        let user2PlayResult = await loloton.send(
            user2.getSender(),
            {
                value: lotteryTicketPrice,
            },
            "play"
        );

        expect(user2PlayResult.transactions).toHaveTransaction({
            from: user2.address,
            on: loloton.address,
            success: true,
            outMessagesCount: 0
        });
        
        lotteryRound = await loloton.getLotteryRound();
        balance = await loloton.getBalance();
        
        expect(lotteryRound.addresses.size).toBe(2);
        expect(lotteryRound.amount).toBe(2n);

        expect(toNano(2 * lotteryTicketPriceInTONs) - balance).toBe(
            user1PlayResult.transactions[1].totalFees["coins"] + 
            user2PlayResult.transactions[1].totalFees["coins"]
        );
    });
});
