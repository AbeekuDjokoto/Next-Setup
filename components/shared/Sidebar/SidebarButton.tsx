import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Props {
  toggleSideBar: () => void;
  pathLink: string;
  label: string;
  md: boolean;
  icon: any;
  type?: string;
}
function SideBarButton({ toggleSideBar, pathLink, label, md, type, ...data }: Props) {
  const pathname = usePathname();

  return (
    <Link
      onClick={md ? toggleSideBar : () => null}
      href={pathLink}
      className={cn([
        'flex w-[220px] items-center gap-3 rounded-lg cursor-pointer p-3 text-white',
        { 'bg-blue-500 ': pathname === pathLink },
        { 'bg-black !text-white': pathname === pathLink && type === 'client' },
        { 'text-black ': type === 'client' },
      ])}>
      <data.icon className="w-4 h-4" />
      {label}
    </Link>
  );
}

export { SideBarButton };
