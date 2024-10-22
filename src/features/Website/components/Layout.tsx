import { Outlet } from 'react-router';

export function WebsiteLayout() {
  return (
    <div>
      <div className="mx-auto grid w-[calc(100%-2rem)] max-w-[576px] py-24">
        <div className="mb-6">{/* <Logo /> */}</div>
        <Outlet />
      </div>
    </div>
  );
}
