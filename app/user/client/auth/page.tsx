import { AuthFormWrapper, SignInForm } from '@/components/features/user';

function SignIn() {
  return (
    <AuthFormWrapper
      type="client"
      label="Buyer/Renter Login"
      description="Enter your email/phone below to sign in">
      <SignInForm type="client" />
    </AuthFormWrapper>
  );
}

export default SignIn;
