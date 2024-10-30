import { header } from '@/assets';

export function Header() {
  return (
    <header className="px-4">
      <div className="px-[58px]">
        <img src={header} />
        <div className="max-w-[800px] w-full flex flex-col gap-1">
          <h1>Discover. Own. Thrive In Accra</h1>

          <ul className="bg-white-">
            <li>Buy</li>
            <li>Rent</li>
            <li>Stays</li>
          </ul>

          <div></div>
        </div>
      </div>
    </header>
  );
}
