import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Ownkey | Your Trusted Real Estate Marketplace in Accra',
  description:
    'Learn about Ownkey, the leading real estate marketplace in Accra. Rent, buy, and sell properties with ease and connect with top real estate agents in Ghana.',
  metadataBase: new URL('https://ownkey.com/about-ownkey'),
};

export default function AboutOwnkey() {
  return (
    <div className="container grid gap-6 py-6 max-w-5xl">
      <div className="grid gap-4">
        <h1 className="text-3xl text-blue-900 font-bold text-center">About Ownkey</h1>
        <p>
          Ownkey.com is a modern real estate platform dedicated to assisting individuals and
          organizations in finding, renting, buying, and selling{' '}
          <Link href={'#'} className="underline hover:text-pink">
            real estate properties specifically in Accra
          </Link>{' '}
          , the capital city of Ghana.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <h2 className="text-2xl font-bold text-pink">Why Accra Only?</h2>
          <p>
            We recognize that navigating Accra's real estate market can be overwhelming and
            time-consuming. That's why we've created a user-friendly and efficient platform that
            simplifies the process and empowers you to make informed decisions. By focusing solely
            on Accra, we ensure a hassle-free property search experience tailored to the specific
            needs of the city's residents and investors.
          </p>

          <p>
            Ownkey offers a vast selection of residential and commercial properties in Accra.
            Whether you're looking for a cozy apartment, a spacious family home, or a prime
            commercial space, our platform enables you to search and find based on location on a
            map, price range, property type, and more.
          </p>
        </div>

        <div className="grid gap-3">
          <h2 className="text-2xl font-bold text-pink">Why Choose Ownkey?</h2>
          <p>
            Whether you're searching for a new residence, aiming to rent out a property, interested
            in purchasing an investment property, or prepared to sell your current property, Owkey
            serves as your advantage and the final destination for all your real estate needs.
          </p>
          <p>
            Our platform features comprehensive property listings that include detailed information
            and high-quality images. Additionally, we provide advanced search filters to facilitate
            a streamlined and efficient property search process.
          </p>

          <div className="grid gap-2">
            <h3 className="text-lg font-bold text-blue-900">Find Your Dream Property</h3>
            <p>
              Discovering your dream home has never been easier. Ownkey offers a powerful search
              functionality that allows you to explore a vast selection of residential and
              commercial properties. Whether you're looking for a cozy apartment, a spacious family
              home, or a prime commercial space, our advanced search filters enable you to refine
              your search based on location, price range, property type, and more. Find the property
              in Accra that meets your unique requirements with just a few clicks.
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-bold text-blue-900">Find Your Ideal Rental Property</h3>
            <p>
              If you're a landlord looking to attract tenants or a renter in search of the perfect
              place to call home, Ownkey is here to assist you. List your rental property on our
              platform and reach a wide audience of potential tenants. For renters, our
              comprehensive rental listings provide detailed property descriptions, high-quality
              images, and key information to help you make an informed decision. Renting or finding
              a rental property in Accra has never been more convenient.
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-bold text-blue-900">
              Buy or Sell Property with Confidence
            </h3>
            <p>
              When it comes to buying or selling a property, Ownkey is your trusted partner. Our
              platform connects Accra property buyers and sellers, facilitating seamless
              transactions and ensuring a smooth experience. Browse through our listings, connect
              with sellers or agents, and negotiate the best deal. For sellers, our platform offers
              extensive exposure and marketing tools to attract qualified buyers. We are committed
              to supporting you every step of the way, from listing to closing the deal.
            </p>
          </div>
        </div>
        <div className="grid gap-6">
          <h2 className="text-2xl text-blue-900 font-bold">What are the Benefits of Ownkey.com?</h2>
          <div className="grid gap-4">
            <p className="text-lg">
              <strong className="text-pink block">1. User-Friendly Experience:</strong> Our platform
              is designed with user experience in mind, making it easy for you to navigate, search,
              and interact with real estate listings.
            </p>
            <p className="text-lg">
              <strong className="text-pink block">2. Comprehensive Property Listings:</strong> We
              offer a wide range of property options, ensuring that you can find what you're looking
              for, whether it's residential or commercial.
            </p>
            <p className="text-lg">
              <strong className="text-pink block">3. Trust and Security:</strong> Your trust and
              security are our top priorities. We implement strict privacy measures and verification
              processes to safeguard your personal information and ensure a secure environment.
            </p>
            <p className="text-lg">
              <strong className="text-pink block">4. Expert Guidance:</strong> Our team of real
              estate professionals is available to provide guidance and assistance throughout your
              property journey. From answering your inquiries to offering valuable insights, we are
              here to help you make informed decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <h2 className="font-bold text-3xl text-blue-900">Our Popular Links</h2>
        <div className="grid gap-2">
          <Link href={'#'} className="underline hover:text-pink">
            Residential Apartments in Accra
          </Link>
          <Link href={'#'} className="underline hover:text-pink">
            Commercial Properties in Accra
          </Link>
          <Link href={'#'} className="underline hover:text-pink">
            Newly Built Homes in Accra
          </Link>
          <Link href={'#'} className="underline hover:text-pink">
            Rent Quickly in Accra
          </Link>
        </div>
      </div>
    </div>
  );
}
