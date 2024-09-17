import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { AnnouncementForm } from './announcement-form';

interface Props {
  closeModal: (...args: any) => void;
  userId: string | string[];
  isMain?: boolean;
  onSendNotification: (...args: any) => void;
  isLoadingSendNotification: boolean;
}
export function Announcement({
  closeModal,
  userId,
  isMain,
  isLoadingSendNotification,
  onSendNotification,
}: Props) {
  return (
    <div className="bg-white w-[380px] sm:w-[500px] md:w-[650px] lg:[850px] p-6 rounded-md grid gap-4 max-h-[600px] overflow-y-auto noscroll-indicator">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Announcement</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer" />
      </div>

      <AnnouncementForm
        closeModal={closeModal}
        isLoading={isLoadingSendNotification}
        onHandleSubmit={onSendNotification}
        userId={userId}
        isMain={isMain}
      />
    </div>
  );
}
