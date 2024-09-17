import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared';
import BackIcon from '@/public/assets/icons/chevron.svg';
import { getInitials } from '@/utils';

interface Props {
  toggleShowChat: () => void;
  user: any;
}

function ChatHeader({ toggleShowChat, user }: Props) {
  return (
    <div className="p-4 flex items-center gap-4 border-b border-blue-300">
      <BackIcon className="rotate-[270deg] w-[25px] h-[25px] sm:hidden" onClick={toggleShowChat} />
      <Avatar className="w-12 h-12">
        <AvatarImage src={user.profileImage} alt={user.firstname} />
        <AvatarFallback>{getInitials(user.firstname, user.lastname)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-2xl">
          {user?.firstname} {user?.lastname}
        </p>
        {/* <p className="text-[10px] text-gray-400">online</p> */}
      </div>
    </div>
  );
}

export { ChatHeader };
