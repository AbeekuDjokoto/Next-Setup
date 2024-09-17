import { getInitials } from '@/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared';

interface Props {
  isHost?: boolean;
  user: any;
  profile?: any;
}
function CustomerDetail({ isHost, user, profile }: Props) {
  return (
    <div className="w-full max-w-5xl p-6 border border-gray-200 rounded-lg grid gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user?.profileImage || ''} alt={`${user?.firstname} ${user?.lastname}`} />
        <AvatarFallback className="text-4xl">
          {getInitials(user?.firstname, user?.lastname)}
        </AvatarFallback>
      </Avatar>

      <div className="grid gap-6">
        <h3 className="text-blue-700 text-lg font-medium">Personal information</h3>

        <div className="grid gap-6 grid-cols-2">
          <div className="grid gap-1">
            <p className="text-gray-500">Name</p>
            <p>{`${user?.firstname} ${user?.lastname}`}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-gray-500">Email Address</p>
            <p>{user?.email || 'N/A'}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-gray-500">Phone Number</p>
            <p>{user?.phone || profile?.phone || 'N/A'}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-gray-500">Date Registered</p>
            <p>{'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CustomerDetail };
