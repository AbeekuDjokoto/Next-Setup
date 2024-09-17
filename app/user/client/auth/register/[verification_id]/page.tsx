import { AuthFormWrapper, VerifyRegistrationForm } from '@/components/features/user';

function VerifyRegistration() {
  return (
    <>
      <AuthFormWrapper type="client" label="Verify" description="Enter your code to verify Account">
        <VerifyRegistrationForm type="client" />
      </AuthFormWrapper>
    </>
  );
}

export default VerifyRegistration;
