import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { InviteAdminForm } from './invite-admin-form';

interface Props {
  closeModal: any;
  permissions: any[];
  isLoading: boolean;
  onHandleSubmit: (...args: any) => any;
}
function InviteAdmin({ closeModal, permissions, onHandleSubmit, isLoading }: Props) {
  return (
    <div className="grid gap-4 bg-white rounded-md max-sm:w-[380px] sm:w-[450px] md:w-[570px] p-6">
      <div className="grid gap-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Create Admin</h2>
          <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
        </div>
        <p className="text-gray-500 text-sm">Enter details to invite admin</p>
      </div>

      <InviteAdminForm
        permissions={permissions}
        onHandleSubmit={onHandleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

export { InviteAdmin };
