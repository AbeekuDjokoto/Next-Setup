'use client';
import React from 'react';
import { Button, Input, Textarea, Icons, ToggleSwitch } from '@/components/shared';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { Controller } from 'react-hook-form';

interface Props {
  closeModal: () => void;
  feature: { label?: string; value?: any; key?: string; type: string };
  setHideAddress?: (...args: any) => void;
  setAvailability?: (...args: any) => void;
  hideAddress?: boolean;
  availability?: boolean;
  control: any;
  isLoading: boolean;
  negotiable: boolean;
  setNegotiable: (...args: any) => void;
}

export function EditPropertyDetails({
  closeModal,
  feature,
  hideAddress,
  availability,
  setAvailability,
  setHideAddress,
  isLoading,
  negotiable,
  setNegotiable,
  control,
}: Props) {
  return (
    <div className="bg-white w-[380px] sm:w-[550px] rounded-md p-6 grid gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{feature.label}</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer" />
      </div>

      {feature?.type === 'switch' && feature.key === 'hideAddress' && (
        <ToggleSwitch
          enabled={hideAddress ?? false}
          setEnabled={setHideAddress || function () {}}
        />
      )}
      {feature?.type === 'switch' && feature.key === 'negotiable' && (
        <ToggleSwitch enabled={negotiable ?? false} setEnabled={setNegotiable || function () {}} />
      )}
      {feature?.type === 'switch' && feature.key === 'availability' && (
        <ToggleSwitch
          enabled={availability ?? true}
          setEnabled={setAvailability || function () {}}
        />
      )}
      {feature?.type === 'textarea' && (
        <Controller
          render={({ field }) => <Textarea {...field} placeholder={feature.label} rows={8} />}
          name={feature.key || ''}
          control={control}
          defaultValue={feature.value}
        />
      )}

      {feature.type === 'NULL' && (
        <Controller
          render={({ field }) => (
            <div className="flex gap-4 items-center">
              <input id={feature.key} {...field} placeholder={feature.label} type={'checkbox'} />
              <label htmlFor={feature.key}>{feature.label}</label>
            </div>
          )}
          name={feature.key || ''}
          control={control}
          defaultValue={feature.value}
        />
      )}

      {feature?.type !== 'switch' &&
        feature?.type !== 'textarea' &&
        feature?.type !== 'images' &&
        feature.type !== 'NULL' && (
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder={feature.label} type={feature.type} />
            )}
            name={feature.key || ''}
            control={control}
            defaultValue={feature.value}
          />
        )}

      <div className="flex justify-end gap-2">
        <Button onClick={closeModal} variant={'outline'} type="button">
          Cancel
        </Button>
        <Button type="submit" form="update-property" onClick={() => console.log('click-submit')}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
}
