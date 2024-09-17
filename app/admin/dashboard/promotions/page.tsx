'use client';
import { Table, Modal, Button } from '@/components/shared';
import { usePromotions } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';
import { CreatePromotion } from '@/components/features/admin';

function Promotions() {
  const {
    promotions,
    isLoadingUsers,
    dropdownActions,
    onCreatePromotion,
    isLoadingCreatePromotion,
    totalPages,
    page,
    setPage,
    columns,
    openModal,
    contentType,
    closeModal,
    showModal,
    action,
  } = usePromotions();

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Promotion Management</h1>
          <Button
            onClick={() => openModal('create-promotion')}
            className="flex gap-2 items-center w-max">
            <PlusIcon /> Create Promotion
          </Button>
        </div>

        <div className="grid gap-3">
          <Table
            action={action}
            dropdownActions={dropdownActions}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            columns={columns}
            data={promotions}
            isLoading={isLoadingUsers}
            isEmpty={!promotions || promotions.length === 0}
            noPagination
          />
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'create-promotion' && (
          <CreatePromotion
            closeModal={closeModal}
            onCreatePromotion={onCreatePromotion}
            isLoading={isLoadingCreatePromotion}
          />
        )}
      </Modal>
    </>
  );
}

export default Promotions;
