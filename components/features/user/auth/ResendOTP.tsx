import { useCountdown } from '@/hooks';
import { cn } from '@/lib/utils';
import { COUNTDOWN_TIME } from '@/utils';

type Props = Readonly<{
  questionText?: string;
  resendBtnText?: string;
  resendPendingText?: string;
  isPending?: boolean;
  resendFn: () => void;
}>;

export function ResendOTP({
  questionText = "Didn't receive code?",
  resendBtnText = 'Resend code',
  resendPendingText = 'Resending...',
  isPending,
  resendFn,
}: Readonly<Props>) {
  function sendOtp() {
    resendFn();
    startCountdown();
  }
  const { formatCountdown, countdown, resendOtp, startCountdown } = useCountdown({
    sendOtp,
  });

  const disabled = (countdown > 0 && countdown < COUNTDOWN_TIME && !isPending) || isPending;

  return (
    <div className="mt-5 flex justify-between items-center">
      <p className="text-sm text-gray-600 font-normal text-center">{questionText}</p>
      <button
        type="button"
        className={cn(
          'text-xs text-blue-800',
          disabled && 'cursor-not-allowed',
          !disabled && `hover:underline`,
        )}
        onClick={() => resendOtp()}
        disabled={disabled}>
        {countdown > 0 &&
          countdown < COUNTDOWN_TIME &&
          !isPending &&
          `Resend in ${formatCountdown(countdown)}`}
        {countdown === 0 && !isPending && resendBtnText}
        {isPending && resendPendingText}
      </button>
    </div>
  );
}
