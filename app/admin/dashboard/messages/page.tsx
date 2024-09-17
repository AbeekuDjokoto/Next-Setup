'use client';

import { Modal, Table, Search, Button } from '@/components/shared';
import { Announcement } from '@/components/features/admin';
import { useAnnouncement, useGetAllAnnouncements } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function Messages() {
  const {
    isLoadingSendNotification,
    onSendNotification,
    openModal,
    contentType,
    closeModal,
    showModal,
  } = useAnnouncement();
  const {
    announcements,
    query,
    setPage,
    page,
    onHandleChange,
    columns,
    dropdownActions,
    action,
    totalPages,
  } = useGetAllAnnouncements();

  const tableData =
    announcements?.map(({ id, title, date, shared }) => {
      return {
        id,
        title,
        shared,
        createdAt: date,
      };
    }) ?? [];

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between pt-4 gap-4">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold">Announcements</h1>
            <p className="text-gray-500 text-sm">
              Do you have a message you want to broadcast. You can reach all or Specific Users
              through this medium.
            </p>
          </div>
          <Button
            variant="default"
            onClick={() => openModal('create-announcement')}
            className="flex gap-2 items-center w-max">
            <PlusIcon /> Create Announcement
          </Button>
        </div>

        <div className="grid gap-3 mt-8">
          <div className="flex gap-4 items-center justify-between">
            <Search
              className="w-[250px]"
              placeholder="search"
              value={query}
              onChange={onHandleChange}
            />
          </div>
          <div>
            <Table
              action={action}
              dropdownActions={dropdownActions}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              columns={columns}
              data={tableData}
              isLoading={false}
              isEmpty={false}
            />
          </div>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'create-announcement' && (
          <Announcement
            closeModal={closeModal}
            userId={''}
            isMain={true}
            isLoadingSendNotification={isLoadingSendNotification}
            onSendNotification={onSendNotification}
          />
        )}
      </Modal>
    </>
  );
}

export default Messages;
