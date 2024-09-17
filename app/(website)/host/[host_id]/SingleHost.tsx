'use client';
import { Breadcrumb } from 'flowbite-react';

import { ROUTES } from '@/utils';
import { useParams, usePathname } from 'next/navigation';
import {
  PropertyCardGrid,
  ViewType,
  HostCard,
  ClientPagination,
  PropertyListSkeleton,
  Button,
  Modal,
  HostListSkeleton,
  HostSkeletonCard,
  ReviewsListSkeleton,
} from '@/components/shared';
import React from 'react';
import EmptyHouse from '@/public/assets/icons/house-empty.svg';
import {
  AuthFormWrapper,
  MyPropertyCard,
  OTPVerificationForm,
  SignInForm,
} from '@/components/features/user';

import { useHostReview, useFilteredProperties, useModal } from '@/hooks/shared';
import { useSingleHost } from '@/hooks/user';
import Skeleton from 'react-loading-skeleton';
import { AddReview, SingleReview } from '@/components/features/website';
import { useAuthStore } from '@/stores';

export default function HostInformation({ host }: { host: any }) {
  const pathname = usePathname();
  const [showMore, setShowMore] = React.useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { host_id } = useParams();
  // check if params is a slug (i.e, kofi-kofi-host-1) or an id (i.e host-1)
  // const hostIdParams = Array.isArray(host_id) ? host_id[0] : host_id;
  // const splittedHostId = hostIdParams.split('-');
  // const hostId =
  //   splittedHostId.length === 2
  //     ? hostIdParams
  //     : `${splittedHostId.at(-2)}-${splittedHostId.at(-1)}`;
  const hasSlug = host_id?.includes('~');

  // const { host, isLoading: isLoadingHost } = useSingleHost(hostId);
  const {
    isLoadingCreateReview,
    onAddReview,
    reviews,
    isLoading: isLoadingReview,
    refetch,
  } = useHostReview(host?.id?.toString() as string);
  const { openModal, closeModal, contentType, showModal } = useModal();

  const [viewType, setViewType] = React.useState<string>('grid');
  const { properties, isLoading, filter, totalPages, total, setFilter, fetchSingleHostProperties } =
    useFilteredProperties(false);

  // React.useEffect(() => {
  //   if (host) {
  //     const host_id = host?.user?.id;
  //     setFilter((prev) => ({ ...prev, host_id }));
  //   }
  // }, [hostId]);

  React.useEffect(() => {
    if (host) {
      const host_id = host?.id;
      fetchSingleHostProperties(host?.id?.toString());
      refetch();
      // refetchProperties();
    }
  }, [host]);

  return (
    <>
      <div className="container flex flex-col py-6 gap-6">
        {isLoading ? (
          <Skeleton height={'35px'} />
        ) : (
          <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href={ROUTES.HOME}>Home</Breadcrumb.Item>
            <Breadcrumb.Item href={ROUTES.FIND_HOST}>Agents</Breadcrumb.Item>
            <Breadcrumb.Item>{`${host?.user.firstname} ${host?.user.lastname}`}</Breadcrumb.Item>
          </Breadcrumb>
        )}

        <div className="grid md:grid-cols-[320px,auto] gap-6">
          {isLoading ? (
            <HostSkeletonCard className="h-full w-full" />
          ) : (
            <div className="border rounded-lg h-max">
              <HostCard host={host} className="border-none" />

              <div className="grid gap-4 p-6">
                {host?.profile?.email_verified ? (
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-xs ">{host?.profile?.address}</p>
                  </div>
                ) : null}
                {host?.profile?.experience ? (
                  <div>
                    <h3 className="font-semibold">Experience</h3>
                    <p className="text-xs">{host?.profile?.experience} years</p>
                  </div>
                ) : null}
                {host?.profile?.rate ? (
                  <div className="">
                    <h3 className="font-semibold">Commission</h3>
                    <div className="grid gap-1 ">
                      <div className="text-xs">
                        <span className="font-medium">Rental:</span> {host?.profile?.rate?.rent}%
                      </div>
                      <div className="text-xs">
                        <span className="font-medium">Sales:</span> {host?.profile?.rate?.sale}%
                      </div>
                    </div>
                  </div>
                ) : null}
                <div>
                  <h3 className="font-semibold">About</h3>
                  <p className="text-xs">
                    {/*{showMore ? host?.profile?.about : `${host?.profile?.about?.substring(0, 250)}`}*/}
                    {showMore ? host?.profile?.about : `Not Available`}
                  </p>
                  <>
                    {host?.profile?.about?.length! > 250 ? (
                      <button
                        className="hover:underline text-xs mt-2 text-pink"
                        onClick={() => setShowMore((prev) => !prev)}>
                        {showMore ? 'Show less' : 'Show more'}
                      </button>
                    ) : null}
                  </>
                </div>
              </div>
            </div>
          )}

          <div className="">
            <div className="flex flex-col gap-4 justify-between relative">
              {!hasSlug ? (
                <div className="flex flex-col gap-4">
                  {isLoading ? (
                    <div className="flex justify-between">
                      <div className="w-16 h-8">
                        <Skeleton className="h-full" />
                      </div>
                      <div className="w-16 h-8">
                        <Skeleton className="h-full" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <p className="text-xs py-2">
                        <strong>{total}</strong> results
                      </p>

                      <ViewType viewType={viewType} setViewType={setViewType} />
                    </div>
                  )}
                  {isLoading ? (
                    <div className="grid gap-4">
                      <PropertyListSkeleton />
                    </div>
                  ) : (
                    <div>
                      <div>
                        {properties.length === 0 ? (
                          <div className="grid place-items-center py-12">
                            <EmptyHouse className="w-44 h-44" />
                            <div className="grid place-items-center">
                              <h3 className="text-lg font-semibold">Ups!... no results found</h3>
                              <p className="text-sm text-gray-500">Please try another search</p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-8">
                            {viewType === 'list' ? (
                              <div className="flex items-center gap-2 flex-wrap">
                                {properties.map((property) => (
                                  <MyPropertyCard key={property.id} property={property} />
                                ))}
                              </div>
                            ) : (
                              <PropertyCardGrid properties={properties} />
                            )}

                            <div className="flex justify-center">
                              <ClientPagination
                                page={filter.page}
                                setPage={(page) => setFilter((prev) => ({ ...prev, page }))}
                                totalPages={totalPages}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
              <div className="grid gap-4  border-t-[1px] py-4">
                {isLoadingReview ? (
                  <div>
                    <ReviewsListSkeleton />
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-4">
                      <>
                        {reviews.length === 0 ? (
                          <div className="grid place-items-center">No reviews yet</div>
                        ) : (
                          <>
                            {reviews.map((item) => (
                              <SingleReview
                                key={item.id}
                                user={item.user}
                                rating={item.value}
                                created_at={item.created_at}
                                message={item.message}
                              />
                            ))}
                          </>
                        )}
                      </>
                    </div>
                    <>
                      {!isAuthenticated ? (
                        <div>
                          <h2 className="font-semibold text-lg">Reviews</h2>

                          <Button onClick={() => openModal('sign-in')} variant={'pink'}>
                            Login to review host
                          </Button>
                        </div>
                      ) : (
                        <>
                          {Number(host?.user?.id) == user?.id || !isAuthenticated ? null : (
                            <AddReview
                              isLoading={isLoadingCreateReview}
                              onAddReview={onAddReview}
                            />
                          )}
                        </>
                      )}
                    </>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'sign-in' && (
          <div className="bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <SignInForm type="client" to={pathname} openModal={() => openModal('verify-code')} />
            </AuthFormWrapper>
          </div>
        )}
        {contentType === 'verify-code' && (
          <div className="bg-white py-6 rounded-lg mx-6">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <OTPVerificationForm type="client" closeModal={closeModal} />
            </AuthFormWrapper>
          </div>
        )}
      </Modal>
    </>
  );
}
