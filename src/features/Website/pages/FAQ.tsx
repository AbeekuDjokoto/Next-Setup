import React from 'react';
import { Link } from 'react-router-dom';

import { Accordion } from '@/components';
import { FREQUENTLY_ASKED_QUESTIONS } from '@/mocks';
import { ROUTES } from '@/utils';

export function FAQ() {
  return (
    <div className="flex justify-between max-w-[1216px] w-full mx-auto py-[104px]">
      <div className="flexColumnSpaceBetween">
        <div className="flex flex-col gap-1 max-w-[384px] w-full text-[var(--text-color)]">
          <h2 className="text-3xl font-bold text-[var(--text-color)]">
            Frequently asked questions
          </h2>
          <p className="text-base">
            Here are quick and helpful answers to some questions you may have.
          </p>
        </div>
        <Link to={ROUTES.CONTACT_SUPPORT} className="text-base text-[#52525B] link_hover">
          Contact Support
        </Link>
      </div>

      <div className="max-w-[752px] w-full">
        {FREQUENTLY_ASKED_QUESTIONS.map((item, index) => (
          <Accordion key={index} index={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
}
