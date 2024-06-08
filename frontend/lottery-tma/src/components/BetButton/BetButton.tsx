import { Button } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import './BetButton.css';

export interface BetButton {
  txt: String;
}

export const BetButton: FC<BetButton> = ({ txt }) => (
  <Button mode="filled" size="l">
    {txt}
  </Button>
);
