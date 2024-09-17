'use client';
import React from 'react';

import {
  AddPropertyForm,
  ChangePropertyStatusForm,
  // VerifyAccoutNotice,
  ConfirmPropertyForm,
  RefreshPropertyPrompt,
} from '@/components/features/user';
import { SuspendPrompt, TablePagination } from '@/components/shared';
import {
  ActionDowndown,
  PropertyCardGrid,
  Search,
  ViewType,
  Table,
  Map,
  Modal,
  Button,
  DeletePrompt,
} from '@/components/shared';
import { useProperties } from '@/hooks/user';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';
import { getStatusVariant } from '@/utils';
import { useModal } from '@/hooks/shared';
import { usePropertyTypes } from '@/hooks/admin';
import { useAuthStore } from '@/stores';
import { StatusTag } from '@/components/shared/StatusTag';
import { PlacesAutoComplete } from '@/components/shared/Map/PlacesAutoComplete';

function Properties() {
  const { user } = useAuthStore();
  const [viewType, setViewType] = React.useState<string>('list');
  const { showModal, openModal, closeModal, contentType } = useModal();
  const {
    query,
    setQuery,
    columns,
    page,
    setPage,
    totalPages,
    action,
    draftDropdownActions,
    completedDropdownActions,
    properties = [],
    isLoading,
    onDeleteProperty,
    isLoadingDeleteProperty,
    onChangePropertyStatus,
    isChangePropertyStatusPending,
    onRefreshProperty,
    isRefreshingProperties,
    onSuspendProperty,
    isSuspendingProperty,
  } = useProperties(openModal, closeModal);

  const { propertyTypes, setSelectType, defaultAmenities } = usePropertyTypes(100);

  const [selected, setSelected] = React.useState(null);

  function onHandleChange(search: string) {
    setQuery(search);
  }
  const properyData =
    properties?.map(({ slug, name, location, images, status, published, id }) => {
      return {
        id: slug,
        image: (
          <img
            src={(images && images[0]) || ''}
            alt={name}
            className="w-[90px] h-[40px] object-cover"
          />
        ),
        name,
        address: location.state,
        status: <StatusTag variant={getStatusVariant(status)}>{status}</StatusTag>,
        action: (
          <ActionDowndown
            id={slug}
            action={action}
            dropdownActions={published ? completedDropdownActions : draftDropdownActions}
            obj={{ name, location, images, status, published, id }}
          />
        ),
      };
    }) ?? [];

  const allRentProperties = properties?.filter((property) => property?.leasing === 'FOR RENT');
  const allSaleProperties = properties?.filter((property) => property?.leasing === 'FOR SALE');
  const allShortStays = properties?.filter((property) => property?.leasing === 'SHORT STAY');

  return (
    <>
      <div className="grid grid-cols-1 gap-10">
        <div className="flex flex-col md:flex-row justify-between pt-4 gap-4">
          <div>
            <h1 className="text-2xl">Properties</h1>
            <p>Post property, manage your propery catalog.</p>
          </div>
          <Button
            variant="default"
            onClick={() => {
              openModal('add-property-form');
            }}
            className="flex gap-2 items-center w-max">
            <PlusIcon /> Add Property
          </Button>
        </div>

        <div className="grid gap-6 py-5 border p-4 rounded-sm">
          <div className="flex flex-col gap-4 md:flex-row  md:justify-between md:items-center">
            <div className="flex gap-2 items-center">
              <p>All({properties?.length})</p>
              <p>For Rent({allRentProperties?.length})</p>
              <p>For Sale({allSaleProperties?.length})</p>
              <p>Short Stays({allShortStays?.length})</p>
            </div>
            <div className="flex gap-4 items-center">
              <Search placeholder="search" value={query} onChange={onHandleChange} />
              <ViewType viewType={viewType} setViewType={setViewType} />
            </div>
          </div>
        </div>

        <div>
          {viewType === 'list' ? (
            <Table
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              columns={columns}
              data={properyData}
              isLoading={isLoading}
              isEmpty={Boolean(properties && properties.length === 0)}
              emptyType="add-property"
              emptyOpenModal={() => {
                if (user?.host?.identity_verified) {
                  openModal('add-property-form');
                } else {
                  openModal('verify-account');
                }
              }}
            />
          ) : (
            <div>
              <PropertyCardGrid properties={properties} />
              <TablePagination page={page} totalPages={totalPages} setPage={setPage} />
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {/* {contentType === 'verify-account' && <VerifyAccoutNotice closeModal={closeModal} />} */}
        {contentType === 'add-property-form' && (
          <AddPropertyForm
            propertyTypes={propertyTypes}
            setPropertyType={setSelectType}
            closeModal={closeModal}
            openModal={openModal}
          />
        )}
        {contentType === 'confirm-property-form' && (
          <ConfirmPropertyForm
            closeModal={closeModal}
            defaultAmenities={defaultAmenities}
            openModal={openModal}
          />
        )}
        {contentType === 'show-map' && (
          <div className="bg-white rounded-md p-6 max-sm:w-[380px] sm:w-[550px] md:w-[650px] lg:w-[750px]">
            <PlacesAutoComplete
              setSelected={setSelected}
              reOpenModal={() => openModal('shop-map')}
              openModal={() => openModal('add-property-form')}
            />
            <Map search selected={selected} />
          </div>
        )}
        {contentType === 'delete-property' && (
          <DeletePrompt
            onSubmit={onDeleteProperty}
            isLoading={isLoadingDeleteProperty}
            closeModal={closeModal}
          />
        )}
        {contentType === 'refresh-property' && (
          <RefreshPropertyPrompt
            onSubmit={onRefreshProperty}
            isLoading={isRefreshingProperties}
            closeModal={closeModal}
          />
        )}
        {contentType === 'suspend-property' && (
          <SuspendPrompt
            closeModal={closeModal}
            onSubmit={onSuspendProperty}
            isLoading={isSuspendingProperty}
          />
        )}
        {contentType === 'change-property-status' && (
          <ChangePropertyStatusForm
            onChangeStatus={onChangePropertyStatus}
            isLoading={isChangePropertyStatusPending}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
}

export default Properties;
