import {Section} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { BetButton } from '@/components/BetButton/BetButton.tsx';

import './BetButtons.css';

export interface BetButtons {
  header: String;
  isDisabled: boolean;
}

export const BetButtons: FC<BetButtons> = ({ header, isDisabled }) => (
    <Section
        header={header}
        footer='Choose lottery ticket to buy and take part in lottery. Each lottery round lasts 10 minutes.'>
        <div className='bet-buttons__list'>
            <BetButton txt='1 ton' isDisabled={isDisabled}/>
            <BetButton txt='10 tons' isDisabled={isDisabled}/>
            <BetButton txt='100 tons' isDisabled={isDisabled}/>
        </div>
    </Section>
);
