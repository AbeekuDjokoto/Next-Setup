import Link from 'next/link';

type SingleProps = {
  icon: string;
  title: string;
  description: string;
  btnText: string;
  btnPath: string;
  data: any;
};

export function CallToActionCard({ title, description, btnPath, btnText, data }: SingleProps) {
  return (
    <div className="grid gap-6 place-items-center max-w-xs">
      <data.icon className="w-[70px] h-[70px]" />
      <div className="grid gap-4 place-items-center">
        <h3 className="text-2xl font-semibold text-center">{title}</h3>
        <p className="text-center text-gray-600">{description}</p>
        <Link className="bg-pink w-max px-6 py-2 rounded text-white font-medium" href={btnPath}>
          {btnText}
        </Link>
      </div>
    </div>
  );
}
