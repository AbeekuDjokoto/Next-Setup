import React from 'react';

import { cn } from '@/libs';

import classes from './Button.module.scss';

type Props = Readonly<{
  children: React.ReactNode;
  variant?: string;
  styles?: object;
  size?: string;
  className?: string;
  image?: any;
  isLoading?: boolean;
  type?: any;
  color?: string;
  onClick?: any;
  disabled?: boolean;
}>;

interface ButtonLoaderProps {
  color: string;
}

export const Button = ({
  children,
  variant = 'primary',
  styles,
  className,
  isLoading,
  ...rest
}: Props) => {
  return (
    <button
      className={cn(className, classes.btn, classes[variant], { [classes.loading]: isLoading })}
      style={{ ...styles }}
      {...rest}>
      {variant === 'primary' ? <div className={classes.green}></div> : null}
      {isLoading ? <ButtonLoader color={''} /> : <>{children}</>}
    </button>
  );
};

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ color }) => {
  const loaderStyle: any = {
    '--loader-bg': color || 'var(--white)',
  };

  return (
    <div className={classes.ldsRing} style={loaderStyle}>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
      <div className={classes.div}></div>
    </div>
  );
};

export default ButtonLoader;
