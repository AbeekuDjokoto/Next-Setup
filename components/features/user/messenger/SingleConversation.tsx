import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared';
import { cn } from '@/lib/utils';
import { getInitials } from '@/utils';

interface Props {
  id: string;
  active: boolean;
  user: { id: number; firstname: string; lastname: string; profileImage: string };
  toggleShowChat: () => void;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

function SingleConversation({ id, user, toggleShowChat, setConversationId, active }: Props) {
  return (
    <div
      onClick={() => {
        toggleShowChat();
        setConversationId(id);
      }}
      className={cn(
        'w-full max-w-80 flex gap-3 justify-between items-center p-4 border-b border-gray-100 md:hover:bg-blue-50 cursor-pointer rounded-md',
        { 'border border-blue-900': active },
      )}>
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.profileImage} alt={user.firstname} />
          <AvatarFallback>{getInitials(user.firstname, user.lastname)}</AvatarFallback>
        </Avatar>

        <div className="grid gap-1">
          <p className="font-semibold">
            {user.firstname} {user.lastname}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleConversation;
