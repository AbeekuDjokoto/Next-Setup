import { AuthFormWrapper, VerifyRegistrationForm } from '@/components/features/user';

function VerifyRegistration() {
  return (
    <>
      <AuthFormWrapper type="host" label="Verify" description="Enter your code to verify Account">
        <VerifyRegistrationForm type="host" />
      </AuthFormWrapper>
    </>
  );
}

export default VerifyRegistration;
