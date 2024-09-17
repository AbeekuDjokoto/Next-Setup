'use client';

import { SubmitHandler } from 'react-hook-form';

import { AuthFormWrapper } from '@/components/features/user';
import { useAdminAuth } from '@/hooks/admin';
import { AdminSignInForm } from '@/components/features/admin';

export default function AdminAuth() {
  const { login, isLoading } = useAdminAuth();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = (data) => {
    login(data);
  };
  return (
    <div className="grid h-screen place-items-center">
      <AuthFormWrapper
        type="admin"
        label="Admin Login"
        description="Enter your email and password below to sign in"
        isAdmin>
        <AdminSignInForm isLoading={isLoading} onHandleSubmit={onSubmit} />
      </AuthFormWrapper>
    </div>
  );
}
