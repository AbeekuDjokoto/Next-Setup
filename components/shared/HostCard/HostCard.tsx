'use client';
import { AuthFormWrapper, OTPVerificationForm, SignInForm } from '@/components/features/user';
import { ClientMessenger } from '@/components/features/website';
import { Modal } from '@/components/shared';
import { useMessenger } from '@/context';
import { useModal } from '@/hooks/shared';
import { cn } from '@/lib/utils';
import { VerifiedIcon } from '@/public/assets/icons';
import WebsiteIcon from '@/public/assets/icons/globe-solid.svg';
import LinkedinIcon from '@/public/assets/icons/linkedin-in.svg';
import ChatIcon from '@/public/assets/icons/message-regular.svg';
import PhoneIcon from '@/public/assets/icons/phone-solid.svg';
import WhatsApp from '@/public/assets/icons/whatsapp.svg';
import { useAuthStore } from '@/stores';
import { ROUTES, setImage } from '@/utils';
import { Rating, Tooltip } from 'flowbite-react';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type Props = Readonly<{
  host?: any;
  className?: string;
  type?: 'client';
}>;
function HostCard({ host, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { showModal, closeModal, contentType, openModal } = useModal();
  const { initialChat } = useMessenger();

  return (
    <>
      <div
        onClick={() => router.push(`${ROUTES.FIND_HOST}/${host?.host_user_name}`)}
        className={cn(
          'flex flex-col justify-center gap-6 p-5 rounded-md border w-full  max-w-md',
          className,
        )}>
        <div className="flex flex-col gap-4 items-center">
          <div className="relative">
            <div className="h-[110px] w-[110px] rounded-full overflow-hidden relative">
              <img
                src={setImage(
                  host?.user?.firstname,
                  host?.user?.lastname,
                  host?.user?.profileImage,
                )}
                alt={host?.user?.firstname}
                className="w-full h-full object-cover"
              />
            </div>
            {host?.identity_verified && (
              <div className="absolute bottom-2 right-[-15px] p-1 rounded-full  bg-purple-500 z-30 text-white">
                {/* verified */}
                <VerifiedIcon className="w-9 h-4" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl">{`${host?.user?.firstname || '-'} ${
              host?.user?.lastname || '-'
            }`}</h3>
            {/* <p className="text-xs ">{`${host?.user?.email ?? '-'}`}</p> */}
            <AverageRating rating={host?.total_rating} />
          </div>

          <p className="text-center text-sm one-line">{host?.profile?.about}</p>

          <div className="flex items-center gap-3 text-blue-950">
            {host?.user?.id == user?.id ? null : (
              <Tooltip content="Message host">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isAuthenticated) {
                      if (user && user.id) {
                        initialChat(user.id, host?.user?.id, {
                          id: host.user.id,
                          firstname: host.user.firstname,
                          lastname: host.user.lastname,
                          profileImage: host.user.profileImage,
                        });
                      }
                      openModal('open-messenger');
                    } else {
                      openModal('sign-in');
                    }
                  }}
                  className="bg-blue-100 h-8 w-8 grid place-items-center rounded-full">
                  <ChatIcon className="h-4 text-blue-900" />
                </button>
              </Tooltip>
            )}

            {host?.socials?.whatsApp ? (
              <Link
                href={`https://wa.me/${host?.profile?.socials?.whatsApp.split('-')[0]}${
                  host.profile.socials.whatsApp.split('-')[1]
                }?text=urlencodedtext`}
                target="_blank">
                <Tooltip content="WhatsApp">
                  <div className="bg-blue-100 h-8 w-8 grid place-items-center rounded-full">
                    <WhatsApp className="h-4 text-blue-900" />
                  </div>
                </Tooltip>
              </Link>
            ) : null}
            {host?.socials?.linkedIn ? (
              <Link href={getLinkedInUrl(host?.profile?.socials?.linkedIn)} target="_blank">
                <Tooltip content="LinkedIn">
                  <div className="bg-blue-100 h-8 w-8 grid place-items-center rounded-full">
                    <LinkedinIcon className="h-4 text-blue-900" />
                  </div>
                </Tooltip>
              </Link>
            ) : null}
            {host?.website ? (
              <Link href={host.profile.website} target="_blank">
                <Tooltip content="Website">
                  <div className="bg-blue-100 h-8 w-8 grid place-items-center rounded-full">
                    <WebsiteIcon className="h-4 text-blue-900" />
                  </div>
                </Tooltip>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="border border-blue-900 p-2 rounded-lg flex gap-4 items-center max-h-[40px] justify-center">
          <PhoneIcon className="text-blue-900" />
          <p className="font-medium">{host?.profile?.phone || host?.user?.phone || 'N/A'}</p>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal} right={contentType === 'open-messenger'}>
        {contentType === 'open-messenger' && <ClientMessenger closeModal={closeModal} />}
        {contentType === 'sign-in' && (
          <div className="bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email below to sign in">
              <SignInForm type="client" to={pathname} openModal={() => openModal('verify-code')} />
            </AuthFormWrapper>
          </div>
        )}
        {contentType === 'verify-code' && (
          <div className="bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter verification OTP to sign in.">
              <OTPVerificationForm type="client" closeModal={closeModal} to={pathname} />
            </AuthFormWrapper>
          </div>
        )}
      </Modal>
    </>
  );
}

export { HostCard };

function AverageRating({ rating }: { rating: number }) {
  const arr = [1, 2, 3, 4, 5];
  return (
    <Rating>
      {arr.map((idx) => {
        return <Rating.Star filled={idx <= rating ? true : false} />;
      })}
    </Rating>
  );
}

function getLinkedInUrl(url: string): Url {
  return url.startsWith('https://www.linkedin.com/in') ? url : `https://www.linkedin.com/in/${url}`;
}
