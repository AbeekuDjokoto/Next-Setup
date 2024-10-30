import { Link } from 'react-router-dom';

import { footerArt } from '@/assets';
import { FOOTER_LINKS } from '@/mocks';
import { ROUTES } from '@/utils';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Input } from '../Input';

export function Footer() {
  return (
    <footer>
      <div className="px-4 flex flex-col gap-10">
        <div className="grid grid-cols-4 justify-between">
          {FOOTER_LINKS.map((link) => (
            <div key={link.title} className="flex flex-col gap-6">
              <h1 className="text-2xl font-medium">{link.title}</h1>
              <div className="text-base flex flex-col gap-4 py-4 text-[var(--black-100)]">
                {link.links.map((l) => (
                  <p key={l.title} className="text-base link_hover pb-1 cursor-pointer">
                    {l.title}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="border-t border-t-[var(--border-color)]" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-10">
              <Icon name="LogoHorizontalBlack" />
              <ul className="flex gap-2 items-center">
                <Link to={ROUTES.ABOUT} className="link_hover pb-1 cursor-pointer">
                  About Us
                </Link>
                <div className="w-1 h-1 bg-black rounded-full" />
                <li className="link_hover pb-1 cursor-pointer">Blog</li>
                <div className="w-1 h-1 bg-black rounded-full" />
                <Link to={ROUTES.CONTACT_SUPPORT} className="link_hover pb-1">
                  Contact Us
                </Link>
              </ul>
            </div>
            <div className="text-[var(--black-100)] flex flex-col justify-between">
              <h1 className="text-[34px] font-medium">Get our apps</h1>
              <div className="flex gap-4">
                <Icon name="AppStore" />
                <Icon name="GooglePlay" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-4">
              <ul className="flex gap-2 items-center">
                <Link to={ROUTES.TERMS_AND_CONDITIONS} className="link_hover pb-1">
                  Terms
                </Link>
                <div className="w-1 h-1 bg-black rounded-full" />
                <Link to={ROUTES.PRIVACY_POLICY} className="link_hover pb-1">
                  Privacy
                </Link>
                <div className="w-1 h-1 bg-black rounded-full" />
                <Link to={ROUTES.FAQ} className="link_hover pb-1">
                  FAQs
                </Link>
              </ul>
              <div>
                <div className="flex flex-col gap-10">
                  <ul className="flex gap-4 items-center">
                    <Icon name="Facebook" />
                    <Icon name="Instagram" />
                    <Icon name="Linkedin" />
                    <Icon name="Twitter" />
                  </ul>
                  <p className="text-sm leading-5">© 2024 Ownkey — All rights reserved</p>
                </div>
              </div>
            </div>
            <div className="max-w-[628px] w-full flex gap-10 justify-between p-[10px] bg-[var(--white-100)] border border-[var(--black-100)] rounded-[10px]">
              <Input
                placeholder="Enter your email to receive new listing alerts"
                className="w-full bg-white border border-[#E5E5E8] rounded-[4px]"
              />
              <Button className="h-[56px] max-w-[120px] w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[64px]">
        <img src={footerArt} alt="footer art" className="mx-auto" />
      </div>
    </footer>
  );
}
