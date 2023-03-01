import React, { useEffect, useState, FC, useRef } from 'react';
import FullscreenWrapper from './components/FullscreenWrapper';
import Main from './components/Main';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import {
  Icurrency,
  setCurrentLeft,
  setCurrentRight,
  setLeftValue,
  setRightValue,
} from './redux/slice/currentSlice';

interface IitemPanels {
  id: number;
  title: string;
  inputValue: string;
}

const App: FC = () => {
  const dispatch = useAppDispatch();
  const mountRef = useRef<boolean>(false);
  const [leftPanel, setLeftPanel] = useState<IitemPanels>({ id: 0, title: 'USD', inputValue: '' });
  const [rightPanel, setRightPanel] = useState<IitemPanels>({
    id: 2,
    title: 'RUB',
    inputValue: '',
  });
  const { currentLeft, currentRight, leftValue, rightValue } = useAppSelector(
    (state) => state.currentSlice,
  );

  const onClickLeft = (obj: Icurrency) => {
    setLeftPanel({ ...leftPanel, id: obj.id, title: obj.title });
    dispatch(setCurrentLeft({ id: obj.id, title: obj.title }));
  };
  const onClickRight = (obj: Icurrency) => {
    setRightPanel({ ...rightPanel, id: obj.id, title: obj.title });
    dispatch(setCurrentRight({ id: obj.id, title: obj.title }));
  };
  const onChangeLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^$|(?<=^| )\d+(\.\d+)?(?=$| )/gm)) {
      let reg = /^0+/gi;
      setLeftPanel({ ...leftPanel, inputValue: e.target.value.replace(reg, '1') });
      dispatch(setLeftValue(e.target.value.replace(reg, '1')));
    }
  };
  const onChangeRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^$|(?<=^| )\d+(\.\d+)?(?=$| )/gm)) {
      let reg = /^0+/gi;
      setRightPanel({ ...rightPanel, inputValue: e.target.value.replace(reg, '1') });
      dispatch(setRightValue(e.target.value.replace(reg, '1')));
    }
  };

  useEffect(() => {
    const fetchExchange = () => {
      fetch(
        `https://api.exchangerate.host/convert?from=${currentLeft.title}&to=${currentRight.title}&amount=${leftValue}&places=2`,
      )
        .then((res) => res.json())
        .then((data) => {
          +leftValue === 0 ? dispatch(setRightValue('0')) : dispatch(setRightValue(data.result));
        });
    };
    fetchExchange();
  }, [leftPanel, rightPanel.title]);
  useEffect(() => {
    if (mountRef.current) {
      const fetchExchange = () => {
        fetch(
          `https://api.exchangerate.host/convert?from=${currentRight.title}&to=${currentLeft.title}&amount=${rightValue}&places=2`,
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(setLeftValue(data.result));
          });
      };
      fetchExchange();
    } else {
      mountRef.current = true;
    }
  }, [rightPanel.inputValue]);

  return (
    <FullscreenWrapper>
      <div className="main-page">
        <Main onClickBtn={onClickLeft} side={'left'} onChangeInput={onChangeLeft} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          style={{ width: 45, height: 45 }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>
        <Main onClickBtn={onClickRight} side={'right'} onChangeInput={onChangeRight} />
      </div>
    </FullscreenWrapper>
  );
};

export default App;
