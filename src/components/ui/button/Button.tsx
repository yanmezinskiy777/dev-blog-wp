import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import styles from './Button.module.css';

interface IButton {
  type: 'link' | 'button';
  click?(event: React.MouseEvent<HTMLElement>): void;
  href: string;
  children: ReactNode;
  classNames: string;
}

const Button: FC<IButton> = ({ type, click, href, children, classNames }) => {
  const classStyles = [styles.button, classNames].join(' ');
  if (type === 'link') {
    return (
      <Link href={href}>
        <a className={classStyles}>{children}</a>
      </Link>
    );
  }
  if (type === 'button') {
    return (
      <button className={classStyles} onClick={click}>
        {children}
      </button>
    );
  }
  return <></>;
};

export default Button;
