import { Button } from '@/components/shared/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shared/Avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="mb-10">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mx-5 md:mx-auto max-w-[95rem] h-[39px] text-[12px]">
        <div></div>
        <div>
          <Link href="#">Advertise</Link> | <Link href="#">Help</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="border">
        <div className="flex items-center justify-between max-w-[95rem] mx-auto h-[69px] w-full bg-background">
          <div className="flex items-center">
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="#"
                className="text-sm font-medium text-[#020817] hover:underline"
                prefetch={false}>
                Buy
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-[#020817] hover:underline"
                prefetch={false}>
                Rent
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-[#020817] hover:underline"
                prefetch={false}>
                Find Agent
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="flex  flex-1 justify-center" prefetch={false}>
              <Image src="/blog/logo.svg" alt="Logo" height={150} width={150} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-[#D62251] text-sm font-medium">
              Start a listing
            </Link>
            <div className="hidden md:flex items-center border rounded-[4rem] p-2">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <MenuIcon className="h-6 w-6" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@ownkey" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="grid gap-4 p-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:underline"
                    prefetch={false}>
                    Buy
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:underline"
                    prefetch={false}>
                    Rent
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:underline"
                    prefetch={false}>
                    Find Agent
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
};

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
