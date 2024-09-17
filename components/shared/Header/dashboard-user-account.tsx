import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { getInitials, logout } from '@/utils';

interface Props {
  user: any;
  className?: string;
  type: string;
}

export function DashboardUserAccount({ user, className, type }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={cn('flex items-center gap-2', className)}>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 text-blue-950">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{getInitials(user?.firstname, user?.lastname)}</AvatarFallback>
            </Avatar>
          </Button>

          <p>{`${user?.firstname} ${user?.lastname}`}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstname}
              {user?.lastname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout(type)}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
