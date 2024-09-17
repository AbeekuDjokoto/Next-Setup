import React from 'react';
import { Button, Modal, UploadDocument, ViewDocument } from '@/components/shared';
import { useModal } from '@/hooks/shared';
import DocIcon from '@/public/assets/icons/document.svg';

export function VerificationDoc() {
  const { showModal, contentType, openModal, closeModal } = useModal();
  return (
    <>
      <div className="grid gap-4">
        <h2 className="font-semibold text-lg">Uploaded document</h2>

        <div className="flex items-center gap-4">
          <DocIcon className="w-[50px] h-[50px]" />
          <div>
            <h5>Verification Doc</h5>
            <button
              onClick={() => openModal('view-docs')}
              className="text-xs text-blue-500 hover:underline">
              View Document
            </button>
          </div>
        </div>

        <div>
          <Button onClick={() => openModal('update-docs')}>Update Verification Documents</Button>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'view-docs' && <ViewDocument />}
        {contentType === 'update-docs' && <UploadDocument closeModal={closeModal} />}
      </Modal>
    </>
  );
}
