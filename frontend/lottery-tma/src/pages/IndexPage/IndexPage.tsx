import { useInitData, useHapticFeedback, type User } from '@tma.js/sdk-react';

import {Section, List, Placeholder, Cell, Info, Image, Text} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useMemo, useEffect } from 'react';

import { TonConnectButton, useTonWallet, CHAIN } from '@tonconnect/ui-react';

import { BetButton } from '@/components/BetButton/BetButton.tsx';

import './IndexPage.css';
import logoImg from  '../../assets/loloton-logo-200x200.jpg';

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
