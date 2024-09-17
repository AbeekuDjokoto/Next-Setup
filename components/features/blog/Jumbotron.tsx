import { Button } from '@/components/shared/Button';

import Image from 'next/image';

interface JumbotronProps {
  title: string;
  subTitle: string;
  onSearch: (blog: string) => void;
}

export const Jumbotron = ({ subTitle, title, onSearch }: JumbotronProps) => {
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
          {/* <Link className="text-[#D62151] ml-1" href="/contact">
            click here.
          </Link> */}
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
