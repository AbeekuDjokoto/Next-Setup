import React from 'react';

import { cn } from '@/lib/utils';

import styles from './Modal.module.scss';

type Props = {
  children: React.ReactNode;
  position?: 'end' | 'center' | 'start';
  hideModal: () => void;
  show: boolean;
};
export function CModal(props: Props) {
  const { children, position = 'center', hideModal, show } = props;

  const flexPosition = {
    center: 'justify-center',
    end: 'justify-end',
    start: 'justify-start',
  };

  return (
    <>
      {show && (
        <div
          onClick={() => hideModal()}
          data-testid="modal"
          className={cn(styles.modal, [
            styles.innerDiv,
            { [flexPosition[position]]: !!position },
            { [styles.center]: position === 'center' },
          ])}>
          <div className={'scale-up-center'} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
