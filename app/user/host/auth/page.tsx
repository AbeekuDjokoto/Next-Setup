import { AuthFormWrapper, SignInForm } from '@/components/features/user';

function SignIn() {
  return (
    <AuthFormWrapper
      type="host"
      label="Host Login"
      description="Enter your email/phone below to sign in"
      className="bg-red-500">
      <SignInForm type="host" className="w-full" />
    </AuthFormWrapper>
  );
}

export default SignIn;
