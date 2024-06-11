import { useInitData, useHapticFeedback, type User } from '@tma.js/sdk-react';

import {Section, List, Placeholder, Cell, Info, Image, Text} from '@telegram-apps/telegram-ui';
import {FC, useState} from 'react';
import { useMemo, useEffect } from 'react';

import { TonConnectButton, useTonWallet, useTonConnectUI, CHAIN } from '@tonconnect/ui-react';

import { BetButton } from '@/components/BetButton/BetButton.tsx';

import './IndexPage.css';
import logoImg from  '../../assets/loloton-logo-200x200.jpg';

import { ContractsInfo } from '@/contracts/data.tsx';

import { Loloton } from '@/contracts/Loloton.ts';
import { useTonClient } from '@/hooks/useTonClient.ts';
import { useAsyncInitialize } from '@/hooks/useAsyncInitialize.ts';
import { Address, OpenedContract, fromNano } from '@ton/core';

export const IndexPage: FC = () => {
    const hapticFeedback = useHapticFeedback();
    useEffect(() => {
        hapticFeedback.impactOccurred('medium');
    }, []);

    // user
    const initData = useInitData();
    const user = useMemo<User | undefined>(() => {
        return initData && initData.receiver ? initData.receiver : undefined;
    }, [initData]);

    // wallet
    const wallet = useTonWallet();
    useEffect(() => {
        hapticFeedback.impactOccurred('heavy');
    }, [wallet]);

    // transactions
    const [tonConnectUI, ] = useTonConnectUI();

    // read data
    const [descriptionInLolotonContract_1, setDescriptionInLolotonContract_1] = useState('...');
    const client = useTonClient();
    const lolotonContract_1 = useAsyncInitialize(async () => {
        if (!client) return;

        const contract = Loloton.fromAddress(Address.parse(ContractsInfo["1"].address));
        return client.open(contract) as OpenedContract<Loloton>;
    }, [client]);
    useEffect(() => {
        if (!client) return;
        if (!lolotonContract_1) return;

        async function getContractData() {
            if (!lolotonContract_1) return;

            const balance1 = await lolotonContract_1.getBalance();
            const lotteryRound1 = await lolotonContract_1.getLotteryRound();

            setDescriptionInLolotonContract_1(`${fromNano(Math.floor(Number(balance1))).split(".")[0]} TONs in lottery, ${lotteryRound1.amount} users`);
        }

        getContractData();
        const intervalId = setInterval(() => {
            getContractData();
        }, 1000 * 10) // in milliseconds
        return () => clearInterval(intervalId);
    }, [lolotonContract_1])

    return (
        <List>
            <Section header={`Hello, ${user?.firstName ?? 'lucky'}! Connect your wallet`}>
                <Info type="text">
                    <Placeholder
                        className='ton-connect-page__placeholder'
                        header='TON Connect'
                        description={<Image size={96} src={logoImg} className="index-page__logo_img" />}
                    />

                    <Text Component="div" className="index-page__text">{wallet
                        ? `Your wallet in ${wallet.account.chain === CHAIN.TESTNET ? "testnet" : "mainnet"} successfully connected! Now you can buy lottery ticket and try to win.`
                        : `Connect your TON wallet to buy lottery ticket and win!`}</Text>

                    <TonConnectButton className='index-page__ton-connect__button'/>
                </Info>
            </Section>
            <Section header={`Current lottery round`}>
                <Cell
                    after={<BetButton txt='1 ton' isDisabled={!wallet} onClick={() => tonConnectUI.sendTransaction({
                        validUntil: Math.floor(Date.now() / 1000) + 60,
                        messages: [
                            {
                                address: ContractsInfo["1"].address,
                                amount: ContractsInfo["1"].amount,
                            },
                        ]
                    })} />}
                    description={descriptionInLolotonContract_1}
                >
                    Buy ticket for 1 ton
                </Cell>
                <Cell
                    after={<BetButton txt='10 tons' isDisabled={true} onClick={() => tonConnectUI.sendTransaction({
                        validUntil: Math.floor(Date.now() / 1000) + 60,
                        messages: [
                            {
                                address: ContractsInfo["10"].address,
                                amount: ContractsInfo["10"].amount,
                            },
                        ]
                    })} />}
                    description={`not supported in test version`}
                >
                    Buy ticket for 10 ton
                </Cell>
                <Cell
                    after={<BetButton txt='100 tons' isDisabled={true} onClick={() => tonConnectUI.sendTransaction({
                        validUntil: Math.floor(Date.now() / 1000) + 60,
                        messages: [
                            {
                                address: ContractsInfo["100"].address,
                                amount: ContractsInfo["100"].amount,
                            },
                        ]
                    })} />}
                    description={`not supported in test version`}
                >
                    Buy ticket for 100 ton
                </Cell>
            </Section>
        </List>
  );
};
