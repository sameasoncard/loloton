import {Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { TonConnectButton, useTonWallet, CHAIN } from '@tonconnect/ui-react';

import { Link } from '@/components/Link/Link.tsx';
import { BetButtons } from '@/components/BetButtons/BetButtons.tsx';

import tonSvg from './ton.svg';

import './IndexPage.css';

export const IndexPage: FC = () => {
    const wallet = useTonWallet();

    return (
    <List>
        <Section
            header='Your wallet to play in lottery'
            footer='Connect your TON wallet to buy lottery ticket and win!'>
            <Cell
                after={<TonConnectButton className='ton-connect-page__button' />}
                description={wallet && `Your wallet from ${wallet.account.chain === CHAIN.TESTNET ? "testnet" : "mainnet"} connected and now you can buy lottery ticket and win.`}
            >
                Your TON wallet
            </Cell>
        </Section>


      <Section
        header='Features'
        footer='You can use these pages to learn more about features'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }}/>}
            subtitle='Connect your TON wallet to play lottery'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>


      <Section
        header='Application Launch Data'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
      </Section>
      <BetButtons header='Your Lottery Ticket' />
    </List>
  );
};
