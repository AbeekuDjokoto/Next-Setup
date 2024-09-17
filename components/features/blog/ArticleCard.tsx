import { Button } from '@/components/shared/Button';
import { formatDate } from '@/utils/date';

import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  image: string;
  link: string;
  author: {
    name: string;
    slug: string;
  };
  date: string;
  category: string;
}

export const ArticleCard = ({ title, description, image, link, author, date, category }: Props) => {
  return (
    <div className="w-full border mb-7 p-5">
      <Link href={link}>
        <div className="block md:grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <Image
              src={image}
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="col-span-2 mt-4 md:mt-0">
            <div className="flex justify-between uppercase mb-7">
              <p className="text-[#52525B] text-[16px]">{author.name}</p>
              <p className="text-[#71717A] text-[14px] font-semibold">{formatDate(date)}</p>
            </div>
            <h3 className="text-[#18181B] text-[20px] md:text-[24px] mb-5">{title}</h3>
            <p className="truncate-multiline text-[#52525B] text-[16px] mb-5">{description}</p>

            <div className="flex justify-between">
              <Button className="bg-[#D62151] rounded-none px-10">
                <p>READ »</p>
              </Button>
              <p className="text-[#D62151]  capitalize">{category}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
