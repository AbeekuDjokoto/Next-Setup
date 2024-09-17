'use client';

import React from 'react';

import { CreateAmenity, EditAmenity, UploadAmenityIcon } from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';
import { useAmenity, useAmenityTypes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';
import Image from 'next/image';

export default function Amenities() {
  const {
    data,
    dropdownActions,
    totalPages,
    page,
    setPage,
    columns,
    action,
    showModal,
    setFile,
    openModal,
    contentType,
    closeModal,
    onCreateAmenity,
    isLoadingCreateAmenity,
    isLoadingAmenities,
    onEditAmenity,
    onDeleteAmenity,
    isLoadingDeleteAmenity,
    isLoadingEditAmenity,
    selectType,
    isLoadingUploadAmenityIcon,
    handleAmenityIconUpload,
    file,
  } = useAmenity();

  const { data: amenityTypes } = useAmenityTypes();

  const amenityData =
    data?.map(({ slug, name, meta, type, icon_url }) => {
      return {
        slug,
        icon: <Image src={icon_url ?? ''} width={40} height={40} alt={name} />,
        name,
        type: type.slug,
        meta,
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Amenities</h1>
          <Button
            onClick={() => openModal('add-type')}
            className="flex gap-2 items-center max-w-max-content">
            <PlusIcon /> Create Amenity
          </Button>
        </div>
        <div>
          <Table
            action={action}
            dropdownActions={dropdownActions}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            columns={columns}
            data={amenityData}
            isLoading={isLoadingAmenities}
            isEmpty={!data || data.length === 0}
          />
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreateAmenity
            closeModal={closeModal}
            onCreateType={onCreateAmenity}
            isLoading={isLoadingCreateAmenity}
            amenityTypes={amenityTypes}
          />
        )}
        {contentType === 'edit-type' && (
          <EditAmenity
            amenityTypes={amenityTypes}
            closeModal={closeModal}
            selectType={selectType}
            onEditAmenity={onEditAmenity}
            isLoading={isLoadingEditAmenity}
          />
        )}
        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeleteAmenity}
            isLoading={isLoadingDeleteAmenity}
          />
        )}
        {contentType === 'upload-icon' && (
          <UploadAmenityIcon
            file={file}
            closeModal={closeModal}
            setFile={setFile}
            isLoading={isLoadingUploadAmenityIcon}
            onUploadIcon={handleAmenityIconUpload}
          />
        )}
      </Modal>
    </>
  );
}
