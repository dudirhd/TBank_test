import './main-back-container.scss';

import MainContainer from '../main-container/main-container';
import { IMainBackContainer } from './main-back-container.typings';

const MainBackContainer = (props: IMainBackContainer) => {
  const { size } = props;

  const className = (size: string) => {
    if (size === 's') {
      return 'MainBackContainer_s';
    } else if (size === 'm') {
      return 'MainBackContainer_m';
    } else if (size === 'l') {
      return 'MainBackContainer_l';
    }
  };

  return (
    <MainContainer>
      <div className={`MainBackContainer ${className(size)}`}>
        {props.children}
      </div>
    </MainContainer>
  );
};

export default MainBackContainer;
