import React, { FC } from 'react';

interface MyButtonProps {
  children: React.ReactNode;
}

const MyButton: FC<MyButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

export default MyButton;
