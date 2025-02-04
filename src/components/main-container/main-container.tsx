import { ReactNode } from 'react';

import './main-container.scss';

interface IMainContainerProps {
  children?: ReactNode;
}

const MainContainer = (props: IMainContainerProps) => {
  return <div className="main-container">{props.children}</div>;
};

export default MainContainer;
