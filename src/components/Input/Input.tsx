import React from 'react';

import { Eye, EyeSlash } from '@phosphor-icons/react';

import { cn } from '@/libs/cn';

import classes from './Input.module.css';

type Props = Readonly<{
  [other: string]: any;

  error?: string | boolean;
  className?: string;
  label?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  name?: string;
  id?: string;

  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  innerClassName?: string;
  inputClassName?: string;
}> &
  React.HTMLAttributes<HTMLInputElement> &
  React.HTMLAttributes<HTMLTextAreaElement>;

export const Input = React.forwardRef(function Input(
  props: Props,
  ref: React.Ref<HTMLInputElement & HTMLTextAreaElement>,
) {
  const {
    label,
    type = 'text',
    error = '',
    className,
    inputClassName,
    innerClassName,
    prefix,
    suffix,
    id,
    ...otherProps
  } = props;

  delete otherProps.defaultValue;

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';

  const [show, setShow] = React.useState(false);

  const computedTestId = `input-${label}`;

  const computedType = React.useMemo(() => {
    switch (type) {
      case 'password':
        return show ? 'text' : 'password';
      case 'date':
        return 'date';
      default:
        return type;
    }
  }, [type, show]);

  const computedInputClassName = cn(
    'w-full border-none min-w-[0px] !outline-0 !bg-[transparent] self-stretch outline-none disabled:text-base-400',
    'group-focus-within/input:translate-y-2 transition-all placeholder:text-transparent',
    'placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-30',
    classes.input,
    inputClassName,
  );

  function focusOnInput() {
    const input = wrapperRef.current?.querySelector('input');
    if (!input) return;
    input.focus();
  }

  function handleWrapperClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    focusOnInput();
  }

  function handleLabelClick(e: React.MouseEvent<HTMLLabelElement>) {
    e.stopPropagation();
    focusOnInput();
  }

  function handleToggleShow() {
    setShow((prev) => !prev);
    focusOnInput();
  }

  return (
    /* WRAPPER */
    <div
      ref={wrapperRef}
      className={cn('', className)}
      onClick={handleWrapperClick}
    >
      {/* INNER */}
      <div
        className={cn(
          innerClassName,
          'group/input relative flex items-center rounded-lg bg-neutral-50/90 p-2 px-3',
          'focus-within:ring-1 focus-within:ring-neutral-base/50',
          { 'ring-1 ring-error-500': !!error },
          { 'h-[56px]': !isTextarea },
        )}
      >
        {prefix}

        {/* TEXT FIELD */}
        {!isTextarea ? (
          <input
            data-testid={computedTestId}
            type={computedType}
            ref={ref}
            className={computedInputClassName}
            id={id ?? otherProps.name}
            placeholder={label}
            {...otherProps}
          />
        ) : null}

        {/* TEXTAREA */}
        {isTextarea ? (
          <textarea
            data-testid={computedTestId}
            className={computedInputClassName}
            ref={ref}
            id={id ?? otherProps.name}
            {...otherProps}
          ></textarea>
        ) : null}

        {/* LABEL */}
        {label ? (
          <label
            className={cn(
              classes.label,
              'pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-neutral-300 transition-all group-focus-within/input:top-2 group-focus-within/input:translate-y-0 group-focus-within/input:text-xs group-focus-within/input:text-neutral-base',
              {
                'top-2 translate-y-0 text-xs': props.value,
              },
            )}
            htmlFor={props?.id ?? props.name}
            onClick={handleLabelClick}
          >
            {label}
          </label>
        ) : null}

        {suffix}
        {isPassword ? (
          <button
            type="button"
            className="text-base-500 grid h-6 w-6 place-content-center text-base"
            onClick={handleToggleShow}
          >
            {!show ? <Eye size={24} className="text-neutral-400" /> : null}
            {show ? <EyeSlash size={24} className="text-neutral-400" /> : null}
          </button>
        ) : null}
      </div>

      {/* MESSAGE */}
      {error && typeof error === 'string' ? (
        <p className="mt-1 text-error-500">{error}</p>
      ) : null}
    </div>
  );
});
