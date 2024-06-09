import { useInitData, type User } from '@tma.js/sdk-react';

import {Section, List, Text, Placeholder} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useMemo } from 'react';

import { TonConnectButton, useTonWallet, CHAIN } from '@tonconnect/ui-react';

import { BetButtons } from '@/components/BetButtons/BetButtons.tsx';

import './IndexPage.css';

export const IndexPage: FC = () => {
    // user
    const initData = useInitData();
    const user = useMemo<User | undefined>(() => {
        return initData && initData.user ? initData.user : undefined;
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

        <BetButtons header='Your Lottery Ticket' isDisabled={!wallet} />
    </List>
  );
};
