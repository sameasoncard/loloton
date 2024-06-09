import { useInitData, type User } from '@tma.js/sdk-react';

import {Section, List, Text, Placeholder, Cell} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useMemo } from 'react';

import { TonConnectButton, useTonWallet, CHAIN } from '@tonconnect/ui-react';

import { BetButton } from '@/components/BetButton/BetButton.tsx';
import { BetButtons } from '@/components/BetButtons/BetButtons.tsx';

import './IndexPage.css';

export const IndexPage: FC = () => {
    // user
    const initData = useInitData();
    const user = useMemo<User | undefined>(() => {
        return initData && initData.receiver ? initData.receiver : undefined;
    }, [initData]);

    // wallet
    const wallet = useTonWallet();

    return (
    <List>
        <Section header={`Hello, ${user?.username ?? 'lucky'}! Set your wallet to play in lottery`}>
            <Placeholder
                className='ton-connect-page__placeholder'
                header='TON Connect'
                description={
                    <>
                        <Text>
                            {!wallet && `Connect your TON wallet to buy lottery ticket and win!`}
                            {wallet && `Your wallet from ${wallet.account.chain === CHAIN.TESTNET ? "testnet" : "mainnet"} connected and now you can buy lottery ticket and win.`}
                        </Text>
                        <TonConnectButton className='index-page__ton-connect__button'/>
                    </>
                }
            />
        </Section>

        <Section>
            <BetButtons header='Your Lottery Ticket' isDisabled={!wallet} />
        </Section>

        <Section>
            <Cell
                after={<BetButton txt='1 ton' isDisabled={!wallet} />}
                description={`100 tons in lottery pool`}
            >
                Buy ticket for 1 ton
            </Cell>
            <Cell
                after={<BetButton txt='10 tons' isDisabled={!wallet} />}
                description={`30 tons in lottery pool`}
            >
                Buy ticket for 10 ton
            </Cell>
            <Cell
                after={<BetButton txt='100 tons' isDisabled={!wallet} />}
                description={`600 tons in lottery pool`}
            >
                Buy ticket for 100 ton
            </Cell>
        </Section>
    </List>
  );
};
