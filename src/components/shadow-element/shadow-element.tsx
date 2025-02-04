import { ReactNode } from 'react';

import './shadow-element.scss';
import { Link } from 'react-router-dom';

interface IShadowElementProps {
  children?: ReactNode;
  hovered: boolean;
  className?: string | null;
  onClick?: () => void;
  link?: string;
}

const ShadowElement = (props: IShadowElementProps) => {
  const { children, hovered, className, onClick, link } = props;

  const element = (
    <section
      className={`shadow-element ${className !== undefined ? className : ''} ${hovered ? 'shadow-element-hover' : ''}`}
      onClick={onClick}
    >
      {children}
    </section>
  );

  if (link === undefined) {
    return element;
  }

  return <Link to={link}>{element}</Link>;
};

export default ShadowElement;
