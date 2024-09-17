'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { DragDropImages } from './DragDropImages';
import { DropFile } from '../DropFile';

type Props = {
  setMediaFiles: (...args: any) => void;
  mediaFiles: any[];
};
export function UploadPropertyImages({ setMediaFiles, mediaFiles }: Props) {
  const acceptableFileTypes = {
    'image/*': ['.jpeg', '.png'],
  };

  return (
    <div
      className={cn('w-full flex flex-col md:flex-row gap-4 bg-white rounded-md border', {
        'border-none': mediaFiles.length > 0,
      })}>
      <DropFile
        accept={acceptableFileTypes}
        setFiles={setMediaFiles}
        isUploadPropertyImages
        hasImg={mediaFiles.length > 0}
      />

      <DragDropImages imageList={mediaFiles} setImageList={setMediaFiles} />
    </div>
  );
}
