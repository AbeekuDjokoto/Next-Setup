'use client';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { Button, Icons } from '@/components/shared';
import Image from 'next/image';

interface Props {
  file: any;
  closeModal: (...any: any) => any;
  isLoading: boolean;
  setFile: (...args: any) => void;
  onUploadIcon: (...any: any) => any;
}

export function UploadAmenityIcon({ closeModal, onUploadIcon, isLoading, setFile, file }: Props) {
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function onSubmit(e: any) {
    e.preventDefault();
    onUploadIcon();
  }

  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Upload Amenity Icon</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <input type="file" onChange={handleChange} />
          {file ? (
            <Image src={file ? URL.createObjectURL(file) : ''} alt="" width={32} height={32} />
          ) : null}
        </div>
        <Button disabled={isLoading} variant={'default'} type="submit" className="w-full mt-12">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
