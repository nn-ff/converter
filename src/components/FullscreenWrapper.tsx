import React, { FC } from 'react';

interface FullscreenWrapperProps {
  children: JSX.Element;
}

const FullscreenWrapper: FC<FullscreenWrapperProps> = ({ children }) => {
  return <div className="main-page__wrapper">{children}</div>;
};

export default FullscreenWrapper;
