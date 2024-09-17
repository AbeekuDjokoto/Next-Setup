import { AuthFormWrapper, ResetPasswordForm } from '@/components/features/user';

function ResetPassword() {
  return (
    <>
      <AuthFormWrapper
        type="host"
        label="Reset your password"
        description="Enter your new password">
        <ResetPasswordForm type="host" />
      </AuthFormWrapper>
    </>
  );
}

export default ResetPassword;
