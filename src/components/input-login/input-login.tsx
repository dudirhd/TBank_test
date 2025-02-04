import {
  ChangeEvent,
  MutableRefObject,
  ReactElement,
  useEffect,
  useState,
} from 'react';

import './input-login.scss';

interface InputLoginProps {
  text: string;
  type: string;
  error?: boolean;
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactElement;
  onIconClick?: () => void;
  disabled?: boolean;
}

export const InputLogin = ({
  text,
  type,
  error,
  inputRef,
  value,
  onChange,
  icon,
  onIconClick,
  disabled,
}: InputLoginProps) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText(value);
  }, [value]);

  return (
    <div className="input-login-wrapper">
      <input
        type={type}
        className={error ? 'error' : ''}
        value={inputText}
        onChange={onChange}
        ref={inputRef}
        disabled={disabled}
      />
      {icon && (
        <div className="input-login-icon" onClick={onIconClick}>
          {icon}
        </div>
      )}

      <p
        className={`input-login-heading ${inputText.length > 0 ? 'active' : ''}`}
      >
        {text}
      </p>
    </div>
  );
};
