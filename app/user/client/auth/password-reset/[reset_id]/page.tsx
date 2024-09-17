import { AuthFormWrapper, ResetPasswordForm } from '@/components/features/user';

function ResetPassword() {
  return (
    <>
      <AuthFormWrapper
        type="client"
        label="Reset your password"
        description="Enter your new password">
        <ResetPasswordForm type="client" />
      </AuthFormWrapper>
    </>
  );
}

export default ResetPassword;
