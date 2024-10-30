import { Icon } from '../Icon';

export function Navbar() {
  return (
    <nav className="pt-2">
      <div className="flex flex-col gap-[10px] text-sm leading-4">
        <div className="px-4 flex pb-2 justify-end items-center gap-2 text-[var(--blue)]">
          <div className="border-r-black border-r px-2">
            <p>Advertise</p>
          </div>
          <div className="flex gap-2 items-center py-2">
            <p>Help</p>
            <Icon name="HelpIcon" className="w-4 h-4" />
          </div>
        </div>
        <hr className="border-t border-t-[var(--border-color)]" />
        <div className="px-4 py-2 flex justify-between items-center gap-2 text-sm leading-4">
          <ul className="flex text-[var(--black)] font-medium">
            <li className="py-2 px-4">Buy</li>
            <li className="py-2 px-4">Rent</li>
            <li className="py-2 px-4">Stays</li>
            <li className="py-2 px-4">Find Agent</li>
          </ul>
          <Icon name="HorizontalLogoRed" />
          <div className="flex gap-2 items-center">
            <p className="text-[var(--red)]">List a property</p>
            <div className="border border-[var(--border-color)] rounded-full p-2 flex gap-3 items-center">
              <Icon name="HamburgerMenu" className="w-4 h-4" />
              <Icon name="Avatar" className="w-8 h-8" />
            </div>
          </div>
        </div>
        <hr className="border-t border-t-[var(--border-color)]" />
      </div>
    </nav>
  );
}
