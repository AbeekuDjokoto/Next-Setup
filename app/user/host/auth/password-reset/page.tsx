import { AuthFormWrapper, ForgotPasswordForm } from '@/components/features/user';

function ForgotPassword() {
  return (
    <AuthFormWrapper
      type="host"
      label="Password assistance"
      description="Enter the email address or mobile phone number associated with your Ownkey account.">
      <ForgotPasswordForm type="host" />
    </AuthFormWrapper>
  );
}

export default ForgotPassword;
