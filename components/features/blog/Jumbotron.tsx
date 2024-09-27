import { Button, Modal } from '@/components/shared';
import { useModal } from '@/hooks';
import { Envelope, Phone, WhatsAppIcon } from '@/public/assets/icons/index';

import Image from 'next/image';
import Link from 'next/link';

interface JumbotronProps {
  title: string;
  subTitle: string;
  onSearch: (blog: string) => void;
}

export const Jumbotron = ({ subTitle, title, onSearch }: JumbotronProps) => {
  const { openModal, closeModal, contentType, showModal } = useModal();

  return (
    <div className="mt-4">
      <div className="text-[40px] md:text-[60px] text-[#18181B]">
        {title === 'Home' ? (
          <>
            <h2>Ownkey</h2>
            <h2>Insights</h2>
          </>
        ) : (
          <h2>{title}</h2>
        )}
      </div>

      <div className="block md:flex justify-between items-center">
        <p className="max-w-lg text-[#18181B] text-[14px] md:text-[16px] mt-5 md:mt-0">
          {subTitle}
          {title === 'Home' && (
            <>
              <span
                onClick={() => openModal('help-line')}
                className="text-[#D62151] ml-1 cursor-pointer"
                >
                click here.
              </span>
              <Modal show={showModal} hideModal={closeModal}>
                {contentType === 'help-line' && (
                  <div className="bg-white p-6 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-2xl">Get in Touch with Us</h3>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <Link
                        href={'https://wa.me/233200034608'}
                        target="_blank"
                        className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400">
                        <WhatsAppIcon className="w-4 h-4" />
                        <span className="text-lg">Chat on Whatsapp</span>
                      </Link>
                      <Link
                        href={'tel:+233200034608'}
                        className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400"
                        title="Help line">
                        <Phone className="w-4 h-4" />
                        <span className="text-lg">+233(0)20-003-4608</span>
                      </Link>
                      <Link
                        href={'mailto:contact@ownkey.com'}
                        className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400"
                        title="Help line">
                        <Envelope className="w-4 h-4" />
                        <span className="text-lg">contact@ownkey.com</span>
                      </Link>
                    </div>
                  </div>
                )}
              </Modal>
            </>
          )}
        </p>
        <div className="w-full max-w-sm mt-5 md:mt-0">
          <div className="border flex items-center space-x-2 p-2">
            <input
              type="text"
              placeholder="Search articles"
              className="border-none w-full rounded-none"
              onKeyUp={(e) => {
                onSearch(e.currentTarget.value);
              }}
            />
            <Button
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch(e.currentTarget.value);
                }
              }}
              type="submit"
              className="bg-[#D62151] rounded-none">
              <Image src="/blog/search.svg" alt="Logo" height={20} width={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
