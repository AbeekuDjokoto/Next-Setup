'use client';
import { Modal, Button } from '@/components/shared';
import { CustomerDetail, Announcement } from '@/components/features/admin';
import { useAnnouncement, useSingleUser } from '@/hooks/admin';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

function Client() {
  const params = useParams();
  const { user_id } = params;
  const {
    onSendNotification,
    isLoadingSendNotification,
    openModal,
    closeModal,
    showModal,
    contentType,
  } = useAnnouncement();

  const { user } = useSingleUser(user_id);

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className={cn('flex items-center justify-between rounded-lg')}>
          <h1 className="font-bold text-2xl">{`${user?.firstname}'s Profile`}</h1>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          <CustomerDetail user={user} />

          <div className="w-full max-w-lg p-6 border border-gray-200 rounded-lg grid gap-4 h-max">
            <h3 className="text-blue-700 text-lg font-medium">Announcement</h3>
            <Button onClick={() => openModal('open-announcement')}>Send Announcement</Button>
          </div>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'open-announcement' && (
          <Announcement
            closeModal={closeModal}
            userId={user_id}
            onSendNotification={onSendNotification}
            isLoadingSendNotification={isLoadingSendNotification}
          />
        )}
      </Modal>
    </>
  );
}

export default Client;
