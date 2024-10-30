import React from 'react';
import { Link } from 'react-router-dom';

import { TERMS_AND_CONDITIONS } from '@/mocks';

export function TermsAndConditions() {
  return (
    <div className="px-4 py-[160px] max-w-[750px] w-full flex flex-col gap-12 justify-center mx-auto">
      <div className="py-6 flex flex-col gap-6 border-b border-b-[var(--border-color)]">
        <h2 className="text-[56px] font-medium">{TERMS_AND_CONDITIONS.title}</h2>
        <p className="text-lg text-[var(--black-100)] opacity-70">
          {TERMS_AND_CONDITIONS.lastRevised}
        </p>
      </div>

      <section className="flex flex-col gap-[30px]">
        {TERMS_AND_CONDITIONS.sections.map((section) => {
          return (
            <>
              <h2 className="text-5xl font-medium">{section.title}</h2>
              <div className="text-lg text-[var(--black-200)] flex flex-col gap-4">
                {section.sections.map((section) => (
                  <>
                    {section.type === 'p' && <p>{section.content}</p>}
                    {section.type === 'list' && (
                      <ul className="list-disc list-inside">
                        {Array.isArray(section.content) ? (
                          section.content.map((item) => <li>{item}</li>)
                        ) : (
                          <li>{section.content}</li>
                        )}
                      </ul>
                    )}
                  </>
                ))}
              </div>
            </>
          );
        })}
      </section>

      <section className="flex flex-col gap-[30px]">
        <h2 className="text-5xl font-medium">13. Miscellaneous Provisions</h2>
        <div className="text-lg text-[var(--black-200)] flex flex-col gap-4">
          <p>
            These Terms, along with our{' '}
            <Link to="/privacy-policy" className="text-[var(--blue-100)]">
              Privacy Policy
            </Link>{' '}
            and any other agreements explicitly referenced, constitute the entire agreement between
            you and Ownkey. They supersede any prior understandings or agreements, whether written
            or oral, related to your use of the platform. This means that everything you need to
            know about your rights and obligations is contained right here. If any part of these
            Terms is found to be invalid or unenforceable by a court of competent jurisdiction, that
            portion will be severed from the rest. The remaining provisions will continue to be in
            full force and effect. We’ve designed these Terms to stand strong, even if a part is
            removed.`
          </p>
          <p>
            Ownkey may assign its rights and obligations under these Terms to another party in
            connection with a merger, acquisition, or sale of assets, or by operation of law. You
            may not assign or transfer your rights or obligations under these Terms without our
            prior written consent. This ensures that our agreement remains clear and enforceable, no
            matter what changes might occur.
          </p>
        </div>
      </section>
    </div>
  );
}
