import { FaqList } from '@/components/features/website';
import { hostFaqsData } from '@/mocks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ownkey FAQs | Your Questions Answered About Accra Real Estate',
  description:
    'Find answers to frequently asked questions about buying, selling, and renting properties in Accra on Ownkey’s comprehensive FAQ page.',
  metadataBase: new URL('https://ownkey.com/faqs/client'),
};

export default function HostFAQS() {
  return (
    <div className="container py-6 grid gap-6 m-auto  max-w-4xl">
      <h1 className="text-3xl font-bold text-blue-900 text-center">Frequently Asked Questions</h1>
      <p className="w-full">Welcome to FAQs for Ownkey Agents, Developers, Hosts and Landlords.</p>
      <FaqList faqsData={hostFaqsData} />

      <div className="grid gap-2 w-full">
        <p>
          Remember, these are just a few common questions. Please feel free to reach out to Ownkey
          support anytime
        </p>
      </div>
    </div>
  );
}
