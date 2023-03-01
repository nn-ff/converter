import { Button, ButtonGroup } from '@mui/material';
import React, { FC } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Icurrency } from '../redux/slice/currentSlice';

interface MainProps {
  onClickBtn: (obj: Icurrency) => void;
  side: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Main: FC<MainProps> = ({ onClickBtn, side, onChangeInput }) => {
  const { currentLeft, currentRight, leftValue, rightValue } = useAppSelector(
    (state) => state.currentSlice,
  );
  const current = side === 'right' ? currentRight.id : currentLeft.id;
  const value = side === 'right' ? rightValue : leftValue;
  const btns = [
    { id: 0, title: 'USD' },
    { id: 1, title: 'EUR' },
    { id: 2, title: 'RUB' },
  ];

  return (
    <div className="main-item">
      <div className="main-item__title">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {btns.map((obj) => (
            <Button
              key={obj.id}
              onClick={() => onClickBtn(obj)}
              color={obj.id === current ? 'success' : 'primary'}>
              {obj.title}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <input
        onChange={onChangeInput}
        value={+value}
        type="number"
        min={1}
        className="main-item__input"
        placeholder="amount"></input>
    </div>
  );
};

export default Main;
