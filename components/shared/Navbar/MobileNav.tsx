import Link from 'next/link';
import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Expandable,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores';
import { PropertyType } from '@/types';
import { ROUTES, getInitials } from '@/utils';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  isMenuOpen: boolean;
  navData: any[];
  toggleSidebar: () => void;
};

export function MobileNav({ isMenuOpen, navData, toggleSidebar }: Props) {
  const { isAuthenticated, reset, user, type } = useAuthStore();

  const router = useRouter();
  return (
    <div
      className={cn(
        'hidden absolute top-0 bg-white py-12 px-6 max-sm:flex flex-col gap-6 h-full w-full border  overflow-y-auto noscroll-indicator transition-all duration-300 ease-in max-w-full z-30',
        'max-md:left-[-100%] max-md:fixed',
        { 'max-md:left-0': isMenuOpen },
      )}>
      <div className="flex-[1] flex flex-col gap-4">
        <div className="flex justify-end">
          <XIcon onClick={toggleSidebar} />
        </div>
        <Accordion data={navData} toggleSidebar={toggleSidebar} />

        <Link
          href={
            isAuthenticated && type === 'HOST'
              ? ROUTES.USER.HOST.DASHBOARD.PROPERTIES
              : ROUTES.USER.HOST.AUTH.LOGIN
          }>
          <button className="w-max font-semibold" onClick={toggleSidebar}>
            Start a Listing
          </button>
        </Link>

        <Button
          onClick={() => {
            router.push(ROUTES.FIND_HOST);
            toggleSidebar();
          }}
          variant={'pink'}>
          Find Agent
        </Button>
      </div>

      <div className="shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-4 items-center">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 text-blue-950">
                  <AvatarImage
                    src={
                      user?.profileImage ??
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'
                    }
                    alt="user"
                  />
                  {isAuthenticated && (
                    <AvatarFallback>
                      {getInitials(user?.firstname || '', user?.lastname || '')}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
              {isAuthenticated ? (
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstname}
                    {user?.lastname}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              ) : (
                <div>Account</div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {isAuthenticated ? (
              <DropdownMenuItem onClick={toggleSidebar}>
                <Link
                  className="w-full"
                  href={
                    type === 'HOST'
                      ? ROUTES.USER.HOST.DASHBOARD.HOME
                      : ROUTES.USER.CLIENT.DASHBOARD.PROFILE
                  }>
                  Account
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={toggleSidebar}>
                  <Link className="w-full" href={ROUTES.USER.CLIENT.AUTH.CREATE_ACCOUNT}>
                    Sign up
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleSidebar}>
                  <Link className="w-full" href={ROUTES.USER.CLIENT.AUTH.LOGIN}>
                    Log in
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}

            <DropdownMenuSeparator />
            {isAuthenticated && (
              <DropdownMenuItem
                onClick={() => {
                  reset();
                  toggleSidebar();
                }}>
                Log out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

type AccordionProps = {
  data: {
    id: string;
    label: string;
    path: string;
    content: PropertyType[];
  }[];
  toggleSidebar: () => void;
};
const Accordion = ({ data, toggleSidebar }: AccordionProps) => {
  const router = useRouter();
  const [openAccordionId, setOpenAccordionId] = React.useState<string | number | null>(null);

  const toggleAccordion = (id: string | number) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };

  return (
    <div className="grid gap-6">
      {data.map((data) => (
        <div role="button" key={data.id} onClick={() => toggleAccordion(data.id)}>
          <div className="flex items-center cursor-pointer justify-between w-full mb-2">
            <h3 className="font-semibold leading-[150%]">{data.label}</h3>
            {openAccordionId === data.id ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </div>
          <Expandable expand={openAccordionId === data.id}>
            <div className="grid gap-3">
              {data.content?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(
                      `${ROUTES.SEARCH_PAGE}?listing=${data.id}&property_type=${item.slug}`,
                    );
                    toggleSidebar();
                  }}
                  className="font-normal text-sm text-black p-2 hover:text-blue-600 hover:bg-blue-50 rounded w-max">
                  {item.name} {`${item.listing === 'FOR_SALE' ? 'for sale' : 'for rent'}`}
                </button>
              ))}
            </div>
          </Expandable>
        </div>
      ))}
    </div>
  );
};
