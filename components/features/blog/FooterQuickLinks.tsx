import Link from 'next/link';

export const FooterQuickLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      <div>
        <h2 className="text-2xl font-semibold mb-8">Residential Properties</h2>
        <ul>
          <li className="py-2 text-sm">
            <Link href="#">Home for sale in Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Apartment for rent in Osu</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Luxury homes in East Legon</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Newly built house in Spintex</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Townhouse for sale in Tema</Link>
          </li>
          <li className="py-2 text-sm text-[#1E429F] font-semibold">
            <Link href="#">More</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8">Commercial Properties</h2>
        <ul>
          <li className="py-2 text-sm">
            <Link href="#">Commercial spaces for rent in Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Office spaces for lease in Ridge</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Shops for rent in Osu</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Commercial lands for sale in Tema</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Business properties for sale in Spintex</Link>
          </li>
          <li className="py-2 text-sm text-[#1E429F] font-semibold">
            <Link href="#">More</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8">Popular Searches</h2>
        <ul>
          <li className="py-2 text-sm">
            <Link href="#">Homes for sale in Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Land for sale in Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Luxury homes for sale in Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Newly built houses for sale</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Estate houses for sale</Link>
          </li>
          <li className="py-2 text-sm text-[#1E429F] font-semibold">
            <Link href="#">More</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8">Gated Communities</h2>
        <ul>
          <li className="py-2 text-sm">
            <Link href="#">Gated estates in East Legon</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Secure communities in Greater Accra</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Family-friendly estates in Labadi</Link>
          </li>
          <li className="py-2 text-sm">
            <Link href="#">Luxury gated communities in Aburi</Link>
          </li>
          <li className="py-2 text-sm text-[#1E429F] font-semibold">
            <Link href="#">More</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
