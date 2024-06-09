import { Button } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import './BetButton.css';

export interface BetButton {
  txt: String;
  isDisabled: boolean;
}

export const BetButton: FC<BetButton> = ({ txt, isDisabled }) => (
  <Button mode="filled" size="m" disabled={isDisabled}>
    {txt}
  </Button>
);
