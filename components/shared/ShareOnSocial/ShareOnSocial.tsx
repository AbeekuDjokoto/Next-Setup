'use client';

import { useCopyToClipBoard } from '@/hooks';
import { FacebookIcon, LinkedinIcon, WhatsAppIcon, XIcon } from '@/public/assets/icons';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { Check, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

export function ShareOnSocial({
  closeModal,
  img,
  title,
  path,
}: {
  closeModal: () => void;
  img?: string;
  title?: string;
  path?: string;
}) {
  const { handleCopyClick, isCopying } = useCopyToClipBoard();
  const pathname = path ? path : usePathname();
  const initialMessage = 'Check out this property on Ownkey!';

  const propertyUrl = `https://ownkey.com${pathname}`;

  return (
    <div className="bg-white w-[90%] m-auto md:w-[500px] p-6 rounded-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Share this property</h3>
        <button onClick={closeModal}>
          <CloseIcon />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {img ? (
          <div className="w-[125px] h-[125px]">
            <img src={img} alt={title} className="rounded-lg w-full h-full object-cover" />
          </div>
        ) : null}
        <p>{title}</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-300 rounded-lg">
            <FacebookShareButton
              title={initialMessage}
              url={propertyUrl}
              hashtag="#ownkey"
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <FacebookIcon className="w-5 h-5" /> Facebook
            </FacebookShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <LinkedinShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <LinkedinIcon className="w-5 h-5" /> LinkedIn
            </LinkedinShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <TwitterShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <XIcon className="w-5 h-5" /> Twitter(X)
            </TwitterShareButton>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <WhatsappShareButton
              url={propertyUrl}
              title={initialMessage}
              className="!p-2 !flex !gap-1 !items-center !h-full !w-full">
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp
            </WhatsappShareButton>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full">
          <input type="text" value={propertyUrl} className="grow rounded" />
          <div>
            {isCopying ? (
              <div className="flex gap-1 items-center justify-center text-sm text-gray-300">
                <Check className="w-4" /> <p className="text-[8px]">copied!</p>
              </div>
            ) : (
              <>
                <CopyToClipboard text={propertyUrl} onCopy={() => handleCopyClick(propertyUrl)}>
                  <button className="grid place-items-center">
                    <Copy
                      {...({
                        className: 'w-5 h-5',
                      } as React.SVGProps<SVGSVGElement>)}
                    />
                  </button>
                </CopyToClipboard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
