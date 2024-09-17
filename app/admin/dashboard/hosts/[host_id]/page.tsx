'use client';
import { Modal, Table, Button } from '@/components/shared';
import { CustomerDetail, Announcement } from '@/components/features/admin';
import { useAllProperties, useAnnouncement, useSingleUser } from '@/hooks/admin';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getStatusVariant } from '@/utils';
import { StatusTag } from '@/components/shared/StatusTag';

function Client() {
  const params = useParams();
  const { host_id } = params;

  const {
    onSendNotification,
    isLoadingSendNotification,
    openModal,
    closeModal,
    showModal,
    contentType,
  } = useAnnouncement();

  const { user } = useSingleUser(host_id);
  const {
    columns,
    isLoading,
    properties,
    page,
    setPage,
    totalPages,
    action,
    dropdownActions,
    query,
    onHandleChange,
  } = useAllProperties(host_id);

  const properyData =
    properties?.map(({ slug, name, location, images, status, host }) => {
      return {
        id: slug,
        image: <Image src={(images && images[0]) || ''} alt={name} width={90} height={40} />,
        name,
        host: `${host?.user?.firstname} ${host?.user?.lastname}`,
        address: location.state,
        status: <StatusTag variant={getStatusVariant(status)}>{status}</StatusTag>,
      };
    }) ?? [];

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
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Properties</h2>
          <Table
            action={action}
            dropdownActions={dropdownActions}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            columns={columns}
            data={properyData}
            isLoading={isLoading}
            isEmpty={Boolean(properties && properties.length === 0)}
          />
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'open-announcement' && (
          <Announcement
            closeModal={closeModal}
            userId={host_id}
            onSendNotification={onSendNotification}
            isLoadingSendNotification={isLoadingSendNotification}
          />
        )}
      </Modal>
    </>
  );
}

export default Client;
