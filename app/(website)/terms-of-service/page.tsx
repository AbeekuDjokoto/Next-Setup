import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Ownkey',
  description: `Welcome to Ownkey Property Manager (“Ownkey”) for Agents, Developers and Landlords. These
  Terms of Use (“Terms”) govern your use of our website and services as an Agent, Developer
  or Landlord to list your properties. By accessing or using the platform, you agree to be
  bound by these Terms.`,
  metadataBase: new URL('https://ownkey.com/terms-of-service'),
};

export default function TermsOfService() {
  return (
    <div className="container grid gap-6 py-6 max-w-5xl">
      <h1 className="font-semibold text-3xl m-auto capitalize text-blue-900">Terms of Service</h1>

      <div className="text-base w-full leading-7">
        <p>
          Welcome to Ownkey Property Manager (“Ownkey”) for Agents, Developers and Landlords. These
          Terms of Use (“Terms”) govern your use of our website and services as an Agent, Developer
          or Landlord to list your properties. By accessing or using the platform, you agree to be
          bound by these Terms.
        </p>
      </div>

      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">1.0 Eligibility</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">1.1</span> To use our services, you must:
          </h3>
        </div>
        <ul className="list-[upper-roman] pl-12">
          <li>Be at least 18 years old.</li>
          <li> Have the legal capacity to enter into a binding contract.</li>
          <li> Hold a valid real estate license if you are an agent or broker.</li>
        </ul>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">2.0 Account Registration</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">2.1</span> You must register for an account to
            access certain features of our platform.
          </h3>
          <h3>
            <span className="font-semibold pr-1">2.2</span> Provide accurate, current, and complete
            information during the registration process.
          </h3>
          <h3>
            <span className="font-semibold pr-1">2.3</span> Maintain the security of your account
            credentials.
          </h3>
          <h3>
            <span className="font-semibold pr-1">2.4</span> Notify us immediately if you discover or
            suspect any security breaches.
          </h3>
        </div>
      </div>

      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">3.0 Prohibited Conduct</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">3.1</span> You agree not to:
          </h3>
        </div>
        <ul className="list-[upper-roman] pl-12">
          <li>Use the platform for any illegal or unauthorized purpose.</li>
          <li>Infringe on the intellectual property rights of others.</li>
          <li>Post false, misleading, or deceptive listings.</li>
          <li>Engage in conduct that is harmful, fraudulent, or deceptive.</li>
        </ul>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">4.0 Intellectual Property</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">4.1</span>All content you submit remains your
            intellectual property.
          </h3>
          <h3>
            <span className="font-semibold pr-1">4.2</span> By posting content, you grant the
            platform a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable
            right to use, reproduce, modify, adapt, publish, translate, create derivative works
            from, distribute, and display such content throughout the world in any media
          </h3>
          <h3>
            <span className="font-semibold pr-1">4.3</span> Use of Services:
          </h3>
        </div>
        <ul className="list-[upper-roman] pl-12">
          <li>Comply with all applicable laws, including real estate laws and regulations.</li>
          <li>Only post listings that you have the authority to rent, sell, or manage.</li>
          <li>
            Ensure all content posted is accurate, not misleading, and does not infringe on any
            third-party rights.
          </li>
        </ul>
      </div>

      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">5.0 Fees and Payments</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">5.1</span> We may charge fees for certain services.
            You are responsible for paying all fees and applicable taxes.
          </h3>
          <h3>
            <span className="font-semibold pr-1">5.2</span> Fees are non-refundable except as
            required by law or as explicitly stated in the service agreement.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">6.0 Termination</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">6.1</span> We may terminate or suspend your account
            and access to the services if you breach these Terms.
          </h3>
          <h3>
            <span className="font-semibold pr-1">6.2</span> Upon termination, your right to use the
            services will immediately cease.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">7.0 Disclaimers</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">7.1</span> The platform is provided “as is” without
            any warranties, express or implied.
          </h3>
          <h3>
            <span className="font-semibold pr-1">7.2</span> We do not warrant that the services will
            meet your requirements or be available on an uninterrupted basis.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">8.0 Limitation of Liability</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">8.1</span> To the maximum extent permitted by law,
            we shall not be liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">9.0 Indemnification</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">9.1</span> You agree to indemnify and hold harmless
            the platform and its officers, directors, employees, and agents from any claims,
            damages, losses, liabilities, and expenses arising out of your use of the services.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">10. Governing Law</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">10.1</span> These Terms shall be governed by the
            laws of the jurisdiction in which the platform operates, without regard to its conflict
            of law provisions.
          </h3>
        </div>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold text-lg">11.0 Changes to Terms</h2>
        <div>
          <h3>
            <span className="font-semibold pr-1">11.1</span> We reserve the right to modify these
            Terms at any time. Your continued use of the services after any modification constitutes
            your acceptance of the new Terms.
          </h3>
        </div>
      </div>

      <p>Version updated on 28-03-2024</p>
    </div>
  );
}
