import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Icurrency {
  id: number;
  title: string;
}
interface currentState {
  currentLeft: Icurrency;
  currentRight: Icurrency;
  leftValue: string;
  rightValue: string;
}

const initialState: currentState = {
  currentLeft: {
    id: 0,
    title: 'USD',
  },
  currentRight: {
    id: 2,
    title: 'RUB',
  },
  leftValue: '1',
  rightValue: '',
};

export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrentLeft: (state, action: PayloadAction<Icurrency>) => {
      state.currentLeft = { ...action.payload };
    },
    setCurrentRight: (state, action: PayloadAction<Icurrency>) => {
      state.currentRight = { ...action.payload };
    },
    setLeftValue: (state, action: PayloadAction<string>) => {
      state.leftValue = action.payload;
    },
    setRightValue: (state, action: PayloadAction<string>) => {
      state.rightValue = action.payload;
    },
  },
});

export const { setCurrentLeft, setCurrentRight, setLeftValue, setRightValue } =
  currentSlice.actions;

export default currentSlice.reducer;
