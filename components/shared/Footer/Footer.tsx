'use client';

import { cn } from '@/lib/utils';
import { footerData } from '@/mocks/footer';
import { ROUTES } from '@/utils';
import { usePathname } from 'next/navigation';

import FacebookIcon from '@/public/assets/icons/facebook-f.svg';
import InstagramIcon from '@/public/assets/icons/instagram.svg';
import LinkedinIcon from '@/public/assets/icons/linkedin-in.svg';
import XIcon from '@/public/assets/icons/x-twitter.svg';
import footerImg from '@/public/assets/images/ownkey-footer-art.png';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const pathname = usePathname();
  return (
    <div
      className={cn({
        hidden: pathname.startsWith('/user') || pathname.startsWith('/admin'),
      })}>
      <div className="w-full grid gap-8 container pt-[80px]">
        <div className="w-full flex flex-col gap-8 sm:flex-row justify-between">
          <div className="w-full grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {footerData.map((item) => {
              return (
                <div key={item.id} className="flex flex-col gap-4">
                  <h4 className="text-base text-black font-medium">{item.label}</h4>
                  <div className="links text-sm flex flex-col gap-3">
                    {item.links.map((item: { label: string; path: string }) => (
                      <a key={item.label} href={item.path} className="link_hover text-xs">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col gap-16 justify-between ">
              <div className="flex flex-col gap-2">
                <h4 className="text-base text-black font-medium">Get to Know Us</h4>
                <Link href={ROUTES.ABOUT_OWNKEY} className="link_hover text-xs">
                  About Ownkey
                </Link>
                <Link href={ROUTES.PRIVACY_POLICY} className="link_hover text-xs">
                  Privacy Policy
                </Link>
                <Link href={ROUTES.TERMS_AND_CONDITIONS} className="link_hover text-xs">
                  Terms and Conditions
                </Link>
                <Link href={ROUTES.USER.HOST.AUTH.LOGIN} className="link_hover text-xs">
                  Property Manager
                </Link>
                <Link href={ROUTES.USER.HOST.AUTH.CREATE_ACCOUNT} className="link_hover text-xs">
                  List a Property
                </Link>
                <Link href={ROUTES.FAQ.CLIENT} className="link_hover text-xs">
                  FAQ
                </Link>

                <div className="flex items-center gap-3 text-blue-950">
                  <Link href="https://web.facebook.com/ownkey.gh">
                    <div className="bg-blue-50 h-8 w-8 grid place-items-center rounded-full">
                      <FacebookIcon className="h-4 text-blue-900" />
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/ownkey.gh/">
                    <div className="bg-blue-50 h-8 w-8 grid place-items-center rounded-full">
                      <InstagramIcon className="h-6 text-blue-900" />
                    </div>
                  </Link>
                  <Link href="https://www.linkedin.com/company/ownkey-gh/">
                    <div className="bg-blue-50 h-8 w-8 grid place-items-center rounded-full">
                      <LinkedinIcon className="h-6 text-blue-900" />
                    </div>
                  </Link>
                  <Link href="https://twitter.com/OwnkeyOfficial">
                    <div className="bg-blue-50 h-8 w-8 grid place-items-center rounded-full">
                      <XIcon className="h-6 text-blue-900" />
                    </div>
                  </Link>
                </div>
              </div>

              <div>
                <p className="font-semibold">
                  <span>&copy;</span>2024 Ownkey
                </p>
                <p>All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Image src={footerImg} alt="ownkey" />
        </div>
      </div>
    </div>
  );
}

export { Footer };
