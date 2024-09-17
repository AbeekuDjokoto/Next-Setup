import { AuthFormWrapper, OTPVerificationForm } from '@/components/features/user';

function VerifyRegistration() {
  return (
    <>
      <AuthFormWrapper
        type="host"
        label="Verify"
        description="Enter your verification OTP to login">
        <OTPVerificationForm type="host" />
      </AuthFormWrapper>
    </>
  );
}

export default VerifyRegistration;
