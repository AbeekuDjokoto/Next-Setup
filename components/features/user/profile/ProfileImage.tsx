'use client';
import Image from 'next/image';
import React from 'react';

import { Label } from '@/components/shared';
import changeProfileIcon from '@/public/assets/icons/edit.svg?url';
import { setImage } from '@/utils';
import { useUpdateProfile } from '@/hooks/user';
import { useAuthStore } from '@/stores';

function ProfileImage() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const { user } = useAuthStore();

  const { handleImageUpload } = useUpdateProfile(uploadedImage, imageUploader);
  return (
    <div className="relative max-w-[106px]">
      {/* <div className="rounded-full overflow-hidden w-[160px] h-[160px] bg-gray-300"> */}
      <img
        src={setImage(user?.firstname, user?.lastname, user?.profileImage)}
        alt={user?.firstname}
        ref={uploadedImage}
        className="object-cover h-[100px] w-[100px] rounded-full"
      />
      {/* </div> */}
      <div>
        <Label htmlFor="upload">
          <Image
            src={changeProfileIcon}
            alt="profile picture"
            className="cursor-pointer absolute bottom-2 right-0"
            width={27}
            height={27}
          />
        </Label>
        <input
          onChange={handleImageUpload}
          id="upload"
          ref={imageUploader}
          type={'file'}
          accept={'image/*'}
          className="hidden"
        />
      </div>
    </div>
  );
}
export default ProfileImage;
