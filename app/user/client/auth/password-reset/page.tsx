import { AuthFormWrapper, ForgotPasswordForm } from '@/components/features/user';

function ForgotPassword() {
  return (
    <AuthFormWrapper
      type="client"
      label="Password assistance"
      description="Enter the email address or mobile phone number associated with your Ownkey account.">
      <ForgotPasswordForm type="client" />
    </AuthFormWrapper>
  );
}

export default ForgotPassword;
