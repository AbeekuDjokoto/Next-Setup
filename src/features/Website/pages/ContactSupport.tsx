import { Link } from 'react-router-dom';

import { contactImage } from '@/assets';
import { Icon } from '@/components';
import { ROUTES } from '@/utils';

export function ContactSupport() {
  return (
    <div className="h-screen flex overflow-y-hidden">
      <div className="w-full max-w-[600px]">
        <img src={contactImage} alt="contact image" className="w-full" />
      </div>
      <div className="pt-6 pb-[64px] px-10 wrapper h-full flexColumnSpaceBetween">
        <Link to={ROUTES.WEBSITE}>
          <Icon name="HorizontalLogoRed" />
        </Link>

        <div className="max-w-[460px] w-full flex flex-col gap-4 text-[var(--black-100)] text-center mx-auto">
          <h2 className="text-[40px] font-medium">Let's help you</h2>
          <p className="text-sm">
            We're here to help you. Whether you're looking for investment opportunities, seeking
            expert advice on buying or renting, or simply have a question, our team is just a call
            or message away.
          </p>
          <p className="text-sm">Let’s connect today!</p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-4 max-w-[340px] w-full">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-[var(--red)] rounded-full" />
              <p className="uppercase text-sm font-medium">Contact us</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Icon name="Telephone" />
                <p className="uppercase text-sm font-medium">0200034608</p>
              </div>
              <div className="flex gap-2 items-center">
                <Icon name="Mail" />
                <a
                  href="mailto:Contact@ownkey.com"
                  className="uppercase text-sm font-medium link_hover"
                  target="_blank">
                  Contact@ownkey.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-[340px] w-full items-end">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-[var(--red)] rounded-full" />
              <p className="uppercase text-sm font-medium">Work hours</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="uppercase text-sm font-medium">Monday - Saturday</p>
              <p className="uppercase text-sm font-medium">9:00 am - 5:00 pm GMT</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 max-w-[340px] w-full">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-[var(--red)] rounded-full" />
              <p className="uppercase text-sm font-medium">Find us</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Icon name="Facebook" />
                <Icon name="Instagram" />
                <Icon name="Linkedin" />
                <Icon name="Twitter" />
              </div>
              <p className="text-base">3rd link street, Spintex rd, Accra</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-[340px] w-full items-end">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-[var(--red)] rounded-full" />
              <p className="uppercase text-sm font-medium">Commericial Request?</p>
            </div>
            <a href="mailto:Contact@ownkey.com" target="_blank">
              <button className="border-2 border-[var(--black-100)] text-base max-w-[156px] w-full rounded-full text-[var(--black-100)] py-[10px] pl-[18px] pr-2 flex items-center gap-2">
                Message us
                <div className="w-6 h-6 bg-[var(--red)] rounded-full mx-auto flex justify-between items-center">
                  <Icon name="RightArrowWithout" className="mx-auto" />
                </div>
              </button>
            </a>
          </div>
        </div>
        <p className="text-sm text-[var(--black-100)] text-center">
          © 2024 Ownkey — All rights reserved
        </p>
      </div>
    </div>
  );
}
