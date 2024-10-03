import { Agent } from '@/types/blog';
import { setImage } from '@/utils';

import Image from 'next/image';
import Rating from './Rating';

export const AgentsCard = ({ user, total_rating, type, host_user_name }: Agent) => {
  return (
    <div className="border rounded-3xl p-3 mb-5">
      <a href={`/host/${host_user_name}`}>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-1">
            <div className="h-[5rem] w-[5rem] rounded-full overflow-hidden relative">
              <img
                src={setImage(user?.firstname, user?.lastname, user?.profileImage)}
                alt={user?.firstname}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex justify-between">
              <div>
                <h3>
                  {user.firstname} {user.lastname}
                </h3>
                <p className="text-[#D62151] text-[12px]">{type.name}</p>
                <div className="flex gap-2 items-baseline">
                  <Rating rating={total_rating} />
                  <span>{total_rating > 1 && total_rating}</span>
                </div>
              </div>

              <Image src="/blog/call.svg" alt="Logo" width={50} height={50} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
