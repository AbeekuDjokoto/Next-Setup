import { Faq } from './Faq';

interface Props {
  faqsData: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export function FaqList({ faqsData }: Props) {
  return (
    <div className="w-full m-auto  max-w-5xl">
      {faqsData.map((faq) => (
        <Faq key={faq.id} id={faq.id} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}
