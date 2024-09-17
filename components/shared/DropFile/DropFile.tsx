'use client';
import React from 'react';
import Dropzone from 'react-dropzone';
import CloudIcon from '@/public/assets/icons/upload-cloud.svg';

import { cn } from '@/lib/utils';
import { Photos } from '@/public/assets/icons';
import { CubicLoader } from '../Loaders';

interface Props {
  setFiles: (...args: any) => any;
  accept?: any;
  maxFiles?: number;
  loading?: boolean;
  isUploadPropertyImages?: boolean;
  hasImg?: boolean;
}

export const DropFile = ({
  setFiles,
  accept,
  maxFiles,
  loading = false,
  isUploadPropertyImages,
  hasImg,
}: Props) => {
  const handleOnDrop = (acceptedFiles: any) => {
    setFiles((prev: any) => {
      const myFiles = new Set(prev?.map((file: any) => file.name));
      const processedFiles = acceptedFiles?.filter((file: any) => !myFiles?.has(file.name));
      return [...prev, ...processedFiles];
    });
  };

  return (
    <>
      {loading ? (
        <CubicLoader />
      ) : (
        <div
          className={cn('cursor-pointer py-8 w-full self-start', {
            'border border-gray-400 rounded max-w-[200px]': hasImg,
          })}>
          <Dropzone
            onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
            accept={accept ? accept : {}}
            maxFiles={maxFiles || 5}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex flex-col justify-center items-center gap-4">
                  <input {...getInputProps()} />
                  <div
                    className={cn('flex flex-col items-center gap-3 md:flex-row', {
                      'md:flex-col': isUploadPropertyImages,
                    })}>
                    {hasImg ? (
                      <div className="flex gap-2 flex-col items-center justify-center">
                        <Photos className="w-[40px] h-[40px]" />
                        <p className="text-lg">Add</p>
                      </div>
                    ) : (
                      <>
                        <CloudIcon className="w-[30px] h-[30px]" />
                        {isUploadPropertyImages ? (
                          'Drag photos here'
                        ) : (
                          <div className="grid">
                            <p className="text-sm">Select a file or drag and drop here</p>
                            <p className="text-center text-xs">File size no more than 10MB</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {!hasImg && (
                    <>
                      {isUploadPropertyImages ? (
                        <button
                          type="button"
                          className="border border-blue-600 px-6 p-3 rounded-sm">
                          Select from computer
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-[#333758] bg-[#f8f9fb] rounded-sm py-2 px-4 text-[10px]">
                          ADD FILE
                        </button>
                      )}
                    </>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      )}
    </>
  );
};
