import Image from 'next/image';

interface Props {
  label: string;
  value: string | number;
  icon: any;
}

function AnalyticCard({ label, value, icon }: Props) {
  return (
    <div className="flex justify-between p-4 rounded-lg shadow-sm w-[320px] h-[140px] border">
      <div className="grid">
        <h3 className="font-medium">{label}</h3>
        <p className="font-bold text-2xl">{value}</p>
      </div>

      <div>
        <Image src={icon} alt="" width={25} height={25} />
      </div>
    </div>
  );
}

export { AnalyticCard };
