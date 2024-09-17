import { AuthFormWrapper, OTPVerificationForm, SignInForm } from '@/components/features/user';
import { Modal } from '@/components/shared';
import { useModal } from '@/hooks';
import { useHostSubscription } from '@/hooks/user';
import { useAuthStore } from '@/stores';
import { usePathname } from 'next/navigation';

interface Price {
  duration: string;
  amount: number;
}

interface Props {
  title: string;
  price: Price;
  benefits: string[];
}

export const PricingPlanCard = ({ title, price, benefits }: Props) => {
  const { isAuthenticated } = useAuthStore();
  const { initPayment } = useHostSubscription();
  const { showModal, openModal, closeModal, contentType } = useModal();

  const pathname = usePathname();

  function verifyIfAuthenticated() {
    if (!isAuthenticated) {
      openModal('sign-in');
      return false;
    }
    return true;
  }

  const onSubmit = () => {
    if (!verifyIfAuthenticated()) return;

    initPayment({
      subscription_id: 72922294,
    });
  };

  return (
    <>
      <div className="flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl bg-gray-50 p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:bg-gray-100">
        <div className="flex-grow">
          <h3 className="font-manrope text-2xl font-bold mb-3">{title}</h3>
          <div className="flex items-center mb-6">
            <span className="font-manrope mr-2 text-4xl font-semibold">₵ {price.amount}</span>
            <span className="text-md text-gray-500">/ {price.duration}</span>
          </div>
          <ul className="mb-12 space-y-6 text-left text-md text-gray-500">
            {benefits.map((benefit, index) => (
              <li className="flex items-center space-x-4" key={index}>
                <svg
                  className="flex-shrink-0 w-6 h-6 text-[#223876]"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            onClick={onSubmit}
            type="submit"
            className="py-2.5 px-5 bg-[#C92251] shadow-sm rounded-md transition-all duration-500 text-base text-white font-semibold text-center w-full hover:bg-[#9a0a33cc]">
            Purchase Plan
          </button>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'sign-in' && (
          <div className="w-[90%] m-auto bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <SignInForm type="client" to={pathname} openModal={() => openModal('verify-code')} />
            </AuthFormWrapper>
          </div>
        )}
        {contentType === 'verify-code' && (
          <div className="w-[90%] m-auto bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <OTPVerificationForm type="client" closeModal={closeModal} to={pathname} />
            </AuthFormWrapper>
          </div>
        )}
      </Modal>
    </>
  );
};
