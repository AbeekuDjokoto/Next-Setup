import MenuIcon from '@/public/assets/icons/bars-solid.svg';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { ROUTES, getInitials, setImage } from '@/utils';
import Link from 'next/link';
import { useAuthStore } from '@/stores';

interface Props {
  className?: string;
}

export function UserAccount({ className }: Props) {
  const { isAuthenticated, reset, user, type } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'flex items-center gap-1 border rounded-full p-2 overflow-hidden w-max cursor-pointer',
            className,
          )}>
          <MenuIcon className="ml-2" />
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
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.firstname}
                  {user?.lastname}
                </p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
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
          </>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="w-full" href={ROUTES.USER.CLIENT.AUTH.CREATE_ACCOUNT}>
                Sign up
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" href={ROUTES.USER.CLIENT.AUTH.LOGIN}>
                Log in
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />
        {isAuthenticated && <DropdownMenuItem onClick={reset}>Log out</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
