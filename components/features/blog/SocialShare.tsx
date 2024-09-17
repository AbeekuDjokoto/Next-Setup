'use client';

import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from '@/public/assets/icons';
import { usePathname } from 'next/navigation';
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';

export const BlogSocialShare = () => {
  const pathname = usePathname();

  const initialMessage = 'Check out this property on Ownkey!';
  const propertyUrl = `https://ownkey.com${pathname}`;

  return (
    <div className="">
      <div className="flex gap-3">
        <div className="bg-black text-white rounded-md">
          <FacebookShareButton
            title={initialMessage}
            url={propertyUrl}
            hashtag="#ownkey"
            className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
            <FacebookIcon className="w-3 h-3" />
          </FacebookShareButton>
        </div>
        <div className="bg-black text-white rounded-md">
          <LinkedinShareButton
            url={propertyUrl}
            title={initialMessage}
            className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
            <LinkedinIcon className="w-3 h-3" />
          </LinkedinShareButton>
        </div>
        <div className="bg-black text-white rounded-md">
          <TwitterShareButton
            url={propertyUrl}
            title={initialMessage}
            className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
            <XIcon className="w-3 h-3" />
          </TwitterShareButton>
        </div>
        <div className="bg-black text-white rounded-md">
          <InstapaperShareButton
            url={propertyUrl}
            title={initialMessage}
            className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
            <InstagramIcon className="w-3 h-3" />
          </InstapaperShareButton>
        </div>
      </div>
    </div>
  );
};
