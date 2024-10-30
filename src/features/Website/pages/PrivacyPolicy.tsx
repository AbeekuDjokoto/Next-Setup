import React from 'react';

import { PRIVACY_POLICY } from '@/mocks';

export function PrivacyPolicy() {
  return (
    <div className="px-4 py-[160px] max-w-[750px] w-full flex flex-col gap-12 justify-center mx-auto">
      <div className="py-6 flex flex-col gap-6 border-b border-b-[var(--border-color)]">
        <h2 className="text-[56px] font-medium">{PRIVACY_POLICY.title}</h2>
        <p className="text-lg text-[var(--black-100)] opacity-70">{PRIVACY_POLICY.lastRevised}</p>
      </div>

      <section className="flex flex-col gap-[30px]">
        {PRIVACY_POLICY.sections.map((section) => {
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
    </div>
  );
}
