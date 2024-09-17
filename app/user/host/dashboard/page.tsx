'use client';
import React from 'react';
import { AnalyticCard, MyPropertyCardList, Notifications } from '@/components/features/user';
import { Button, Modal, UploadDocument } from '@/components/shared';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores';
import { useProperties } from '@/hooks/user';
import {
  ShareIcon,
  ImpressionsIcon,
  ClickIcon,
  ReactionIcon,
  CommentIcon,
} from '@/public/assets/icons';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = React.useState(false);
  const { properties } = useProperties();
  // const { data: sData } = useHostDashboard();

  // console.log({ sData });

  const data = 'coming soon';

  return (
    <>
      <div className="flex flex-col py-6 gap-6 md:flex-row">
        {user?.host?.identity_verified ? (
          <>
            <div className="w-full max-w-sm">
              <h2 className="font-medium pb-3 text-lg">Recent Listings</h2>
              {properties.length === 0 ? (
                <div className="">
                  <p className="text-black mt-12">No Property Listings</p>
                </div>
              ) : (
                <MyPropertyCardList properties={properties} />
              )}
            </div>

            <div className="grow flex flex-col">
              <div>
                <h2 className="font-medium pb-3 text-lg">Analytics</h2>
                {data ? (
                  <h3 className="bg-blue-200 px-4 py-2 rounded-full w-max">{data}</h3>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    <AnalyticCard label="Impressions" value={'+2,500'} icon={ImpressionsIcon} />
                    <AnalyticCard label="Reactions" value={'+1,750'} icon={ReactionIcon} />
                    <AnalyticCard label="Shares" value={160} icon={ShareIcon} />
                    <AnalyticCard label="Clicks" value={'+3,000'} icon={ClickIcon} />
                    <AnalyticCard label="Comments" value={75} icon={CommentIcon} />
                  </div>
                )}
              </div>

              <Notifications />
            </div>
          </>
        ) : (
          <div className="w-full">
            <div
              className={cn(
                'flex justify-between items-center p-6  rounded-md sticky top-0 bg-green-50 border border-green-200',
              )}>
              <p className="text-lg max-w-xl font-medium">
                Welcome to ownkey, your account is being setup. To speed up the process upload a
                business certificate, license or a government issued id as verification document.
              </p>

              <div className="flex justify-end">
                <Button variant={'outline'} onClick={() => setShowModal(true)}>
                  Verify Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal show={showModal} hideModal={() => setShowModal(false)}>
        <UploadDocument closeModal={() => setShowModal(false)} />
      </Modal>
    </>
  );
}
