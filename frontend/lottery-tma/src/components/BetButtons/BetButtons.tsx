import {Cell, Section} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { BetButton } from '@/components/BetButton/BetButton.tsx';

import './BetButtons.css';

export interface BetButtons {
  header: String;
}

export const BetButtons: FC<BetButtons> = ({ header }) => (
    <Section
        header={header}
        footer='Choose lottery ticket to buy and take part in lottery. Each lottery round lasts 10 minutes.'>
      <Cell>
        <div className='bet-buttons__list'>
          <BetButton txt='1 ton' />
          <BetButton txt='10 tons' />
          <BetButton txt='100 tons' />
        </div>

      </Cell>
    </Section>
);
