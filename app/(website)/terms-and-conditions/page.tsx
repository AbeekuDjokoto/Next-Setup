import { Agreement } from '@/components/features/website';
import { termsAndConditionsData } from '@/mocks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Ownkey',
  description: `These Terms and Conditions ("Terms") govern your access to and use of the website, app and
    services (“website and services”) provided by Ownkey Real Estate Limited ("Ownkey"). By
    accessing or using our website and services, you agree to be bound by these Terms. Please
    read these Terms carefully before using Ownkey's websites and services. If you do not
    agree to these Terms, please refrain from using any our website, and services.`,
  metadataBase: new URL('https://ownkey.com/terms-and-conditions'),
};

export default function TermsAndConditions() {
  return (
    <div className="container grid gap-6 py-6 max-w-5xl">
      <h1 className="font-semibold text-3xl m-auto capitalize text-blue-900">
        Terms and Conditions
      </h1>

      <div className="text-base w-full leading-7">
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of the website, app and
          services (“website and services”) provided by Ownkey Real Estate Limited ("Ownkey"). By
          accessing or using our website and services, you agree to be bound by these Terms. Please
          read these Terms carefully before using Ownkey's websites and services. If you do not
          agree to these Terms, please refrain from using any our website, and services.
        </p>
      </div>

      <ol className="grid gap-8 w-full">
        {termsAndConditionsData.map((item) => {
          return <Agreement terms={item} key={item.id} />;
        })}
      </ol>

      <div className="border-t border-black grid gap-4 py-2">
        <p>
          These terms and conditions are intended to ensure a fair and professional environment for
          all users of Ownkey’s services. By adhering to these guidelines, you help maintain the
          integrity and quality of the platform. By using Ownkey, you acknowledge that you have
          read, understood, and agree to be bound by these Terms of Use.
        </p>
        <p>Version updated on 28-03-2024</p>
      </div>
    </div>
  );
}
