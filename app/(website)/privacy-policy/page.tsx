import { Agreement } from '@/components/features/website';
import { privacyPolicy } from '@/mocks/privacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ownkey',
  description: `At Ownkey, we are committed to protecting the privacy and security of your personal
  information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your
  information when you interact with our website, services, and other related platforms. By
  accessing or using our services, you consent to the practices described in this Privacy
  Policy.`,
  metadataBase: new URL('https://ownkey.com/terms-of-service'),
};

export default function PrivacyPolicy() {
  return (
    <div className="container grid gap-6 py-6 max-w-5xl m-auto">
      <h1 className="font-bold text-blue-900 text-3xl text-center">Privacy Policy</h1>

      <p>
        At Ownkey, we are committed to protecting the privacy and security of your personal
        information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your
        information when you interact with our website, services, and other related platforms. By
        accessing or using our services, you consent to the practices described in this Privacy
        Policy.
      </p>

      <ol className="grid gap-8 w-full">
        {privacyPolicy.map((policy) => {
          return <Agreement terms={policy} key={policy.id} />;
        })}
      </ol>
    </div>
  );
}
