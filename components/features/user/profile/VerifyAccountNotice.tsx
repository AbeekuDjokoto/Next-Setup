import { Button } from '@/components/shared';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { ROUTES } from '@/utils';
import Link from 'next/link';

export function VerifyAccoutNotice({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="p-6 bg-white grid gap-4 w-[386px] sm:w-[550px] rounded text-black">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Verify Account</h3>
        <CloseIcon onClick={closeModal} className="cursor-pointer" />
      </div>

      <div className="grid gap-2">
        <p className="text-lg">Please verify your account to list a property</p>
        <Link href={ROUTES.USER.HOST.DASHBOARD.HOME}>
          <Button>Verify</Button>
        </Link>
      </div>
    </div>
  );
}
