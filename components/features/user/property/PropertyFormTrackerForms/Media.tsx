'use client';

import { FormLabel, Input, Label } from '@/components/shared';
import { UploadPropertyImages } from '@/components/shared/UploadPropertyImages';
import { Info } from '@/public/assets/icons';
import { Controller } from 'react-hook-form';

interface Props {
  setMediaFiles: (...args: any) => void;
  mediaFiles: any[];
  propertyImages: string[];
  control: any;
  video_url: string;
}
function Media({ setMediaFiles, mediaFiles, propertyImages, control, video_url }: Props) {
  return (
    <div className="w-full grid gap-4">
      <div>
        <h2 className="font-semibold text-xl">Add Photos</h2>
        <p className="text-sm">Photos help renters imagine living in your place.</p>
        <div className="flex gap-2  mt-3 max-w-[600px]">
          <Info className="w-5 h-5" />
          <p className="text-sm">
            You can select 5 images at a time, the first image is the display image.
          </p>
        </div>
        <p className="font-semibold text-sm pt-6">Drag and drop to reorder</p>
      </div>
      <UploadPropertyImages setMediaFiles={setMediaFiles} mediaFiles={mediaFiles} />

      {propertyImages?.length > 0 && (
        <div className="grid gap-4">
          <h3 className="font-semibold">Uploaded Images</h3>
          <div className="w-full flex gap-2 flex-wrap">
            {propertyImages.map((image) => (
              <div key={image} className="w-20 h-20">
                <img src={image} alt={image} className="object-cover h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-xl">Add Video Link</h2>
        <p className="text-sm">Submit the link to a video of your property if you have any</p>
        <div className="flex gap-2  mt-3 max-w-[600px]">
          <Controller
            render={({ field }) => (
              <div className="grid gap-1 max-w-2xl w-full">
                <Label className="text-lg font-medium">Property Description</Label>
                <Input id="video_url" placeholder="Video Link" {...field} className='w-full' />
              </div>
            )}
            name="video_url"
            control={control}
            defaultValue={video_url}
          />
        </div>
      </div>
    </div>
  );
}

export { Media };
