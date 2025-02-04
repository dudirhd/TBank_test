import { useNavigate } from 'react-router-dom';

import './back-button.scss';

import { FC } from 'react';

interface IBackButton {
  navigation?: string;
}

const BackButton: FC<IBackButton> = (props) => {
  const { navigation } = props;

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigation ? navigate(navigation) : navigate(-1);
  };

  return (
    <div className="back-button" onClick={() => handleBackButton()}>
      <p className="back-button_text">{'<'}Назад</p>
    </div>
  );
};

export default BackButton;
