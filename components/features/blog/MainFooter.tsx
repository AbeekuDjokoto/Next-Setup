import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

import Image from 'next/image';
import Link from 'next/link';

export const MainFooter = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="cols-span-1">
          <Image src="/blog/logo-dark.svg" alt="Logo" width={170} height={170} className="mb-16" />
          <div className="text-[0.8rem] mb-5">
            <ul className="list-disc pl-5 flex gap-5">
              <li>
                <a
                  href="https://ownkey.com/about-ownkey"
                  target="_blank"
                  className="
              border-b border-[#D62151]">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/about">Blog</Link>
              </li>
              <li>
                <Link href="/about">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-[0.8rem] flex gap-5">
            <ul className="list-disc pl-5 flex gap-5">
              <li>
                <a
                  href="https://ownkey.com/terms-and-conditions"
                  target="_blank"
                  className="
              border-b border-[#D62151] list-disc-none">
                  Terms
                </a>
              </li>
              <li>
                <a target="_blank" href="https://ownkey.com/privacy-policy">
                  Privacy
                </a>
              </li>
              <li>
                <a target="_blank" href="https://ownkey.com/faqs/client">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="https://web.facebook.com/ownkey.gh" target="_blank">
              <Image src="/blog/facebook.svg" alt="Logo" width={25} height={25} />
            </a>
            <a href="https://www.instagram.com/ownkey.gh/" target="_blank">
              <Image src="/blog/instagram.svg" alt="Logo" width={25} height={25} />
            </a>
            <a href="https://www.linkedin.com/company/ownkey-com" target="_blank">
              <Image src="/blog/linkedin.svg" alt="Logo" width={25} height={25} />
            </a>
            <a href="https://x.com/OwnkeyOfficial" target="_blank">
              <Image src="/blog/x.svg" alt="Logo" width={25} height={25} />
            </a>
          </div>
          <p className="text-[0.8rem] mt-10">© 2024 Ownkey - All Rights Reserved</p>
        </div>

        <div className="cols-span-1 mt-5 md:mt-0">
          <h2 className="font-medium text-[34px] mb-8">Get our apps</h2>
          <div className="flex gap-5">
            <a
              href="https://play.google.com/store/apps/details?id=com.wookin.realestate&hl=en"
              target="_blank">
              <Image src="/blog/googleplay.svg" alt="Logo" width={200} height={200} />
            </a>
            <a href="">
              <Image src="/blog/appstore.svg" alt="Logo" width={200} height={200} />
            </a>
          </div>
          <div className="flex gap-5 w-full mt-10 items-center space-x-2 bg-[#F2F2F2] border rounded-md border-[#000] p-4">
            <Input
              type="email"
              placeholder="Enter your email to receive listing alerts"
              className="py-6"
            />
            <Button type="submit" className="bg-[#000] py-6">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-20">
        <Image src="/blog/abs.svg" alt="Logo" height={1000} width={1000} />
      </div>
    </>
  );
};
