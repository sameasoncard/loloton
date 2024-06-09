import { Button } from '@telegram-apps/telegram-ui';
import type {FC, MouseEventHandler} from 'react';

import './BetButton.css';

export interface BetButton {
  txt: String;
  isDisabled: boolean;
  onClick?: undefined | MouseEventHandler<HTMLButtonElement>;
}

export const BetButton: FC<BetButton> = ({ txt, isDisabled, onClick}) => (
  <Button mode="filled" size="m" disabled={isDisabled} className="button-buy" onClick={onClick}>
    {txt}
  </Button>
);
