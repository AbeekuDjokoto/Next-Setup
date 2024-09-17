import { Metadata } from 'next';
import { AuthFormWrapper, SignUpForm } from '@/components/features/user';

export const metadata: Metadata = {
  title: 'Sign Up for Ownkey | Join Accra’s Real Estate Community',
  description:
    'Create an account with Ownkey and join the vibrant real estate community in Accra. Buy, sell, or rent properties and connect with local agents.',
  metadataBase: new URL('https://ownkey.com/user/host/auth/register'),
};

export default function SignUp() {
  return (
    <>
      <AuthFormWrapper
        type="client"
        label="Renter/Buyer Sign Up"
        description="Enter your detail below to create your account">
        <SignUpForm type="client" />
      </AuthFormWrapper>
    </>
  );
}
