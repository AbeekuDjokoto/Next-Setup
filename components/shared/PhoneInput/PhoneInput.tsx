'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { ErrorText } from '../ErrorText';
import { useCountriesData } from '@/hooks/shared';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  selectedVal?: string;
  handleChange: (...args: any) => any;
  id?: string;
  isRequired?: boolean;
  name?: string;
  type?: string;
  error?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, error, selectedVal, handleChange, label, isRequired, name }, ref) => {
    const { countries: options } = useCountriesData();
    const code = useMemo(() => {
      const value = selectedVal?.split('-')[0];
      return value;
    }, [selectedVal]);

    const number = useMemo(() => {
      const value = selectedVal?.split('-')[1];
      return value || '';
    }, [selectedVal]);

    const [isOpen, setIsOpen] = useState(false);
    const [displayImage, setDisplayImage] = useState('');
    const [query, setQuery] = useState('');
    const [countryCode, setCountryCode] = useState(code);
    const [value, setValue] = useState(number);

    const inputRef = React.useRef<HTMLDivElement>(null);

    const isNumber = /^\d+$/;

    useEffect(() => {
      const option = setDefault(options);
      setCountryCode(option?.code);
      setDisplayImage(option?.image);
    }, [options]);

    useEffect(() => {
      if (value) handleChange(countryCode + '-' + value);
      else handleChange('');
    }, [countryCode, value]);

    const selectOption = (option: any) => {
      setQuery(() => '');
      setDisplayImage(option.image);
      setCountryCode(option.code);
      setIsOpen((isOpen) => !isOpen);
    };

    const getDisplayValue = () => {
      if (query) return query;
      if (countryCode) return countryCode;
      return '';
    };

    const setDefault = (options: any) => {
      const value = options?.filter((option: any) => {
        if (option?.label === 'Ghana') return option;
      });
      return value[0];
    };

    const filter = (options: any) => {
      return options?.filter((option: any) => option?.code?.indexOf(query) > -1);
    };

    function closeMenu(e: any) {
      if (inputRef.current && isOpen && !inputRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function toggle() {
      setIsOpen(!isOpen);
    }

    return (
      <div className={cn(`grid gap-1`)}>
        {label ? (
          <label className={cn(`text-sm font-medium`)} htmlFor={id}>
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
        ) : null}
        <div
          onClick={closeMenu}
          ref={inputRef}
          className={`dropdown flex gap-0 border rounded-md h-12 items-center px-3`}>
          <div className={cn(`relative px-2 rounded-md`)} onClick={toggle}>
            <div className={cn(`flex gap-2 items-center`)}>
              <div className={cn(`flex items-center gap-2`)}>
                {displayImage ? (
                  <img className="image" src={displayImage} alt={''} width={24} height={24} />
                ) : null}
                <input
                  className={cn('w-[75px] border-none')}
                  type="text"
                  value={getDisplayValue()}
                  onClick={toggle}
                  name={name}
                  placeholder="Select..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCountryCode('');
                  }}
                />
              </div>
              <div className={cn(`caret transition-all ${isOpen ? 'rotate-180' : ''}`)}>
                <ChevronDown />
              </div>
            </div>
            <div className={cn(`options !max-h-[200px] !top-10 ${isOpen ? 'open' : ''}`)}>
              {options.length ? (
                filter(options)?.map((option: any) => (
                  <div
                    onClick={() => selectOption(option)}
                    className={`option ${option.label === countryCode ? 'selected' : ''} ${
                      option.image ? 'grid-cols-[24px_max-content]' : ''
                    }`}
                    key={`${option.label}`}>
                    {option.image ? (
                      <span>
                        <img
                          className="image"
                          src={option.image}
                          alt={option?.label}
                          width={24}
                          height={24}
                        />
                      </span>
                    ) : null}
                    {option.code}
                  </div>
                ))
              ) : (
                <div className={cn(`p-[12px_24px]`)}>No Options</div>
              )}
            </div>
          </div>
          <input
            ref={ref}
            value={value}
            data-testid={'phoneNumber'}
            className={cn(`outline-none w-full`)}
            name={name}
            placeholder="Enter number"
            onChange={(e) => {
              if (isNumber.test(e.target.value) || e.target.value === '') setValue(e.target.value);
            }}
          />
        </div>
        <ErrorText error={error ?? ''} />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
