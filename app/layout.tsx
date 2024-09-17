import { ContactOwnkey, Footer, GoogleAnalytics, NavBar, Providers } from '@/components/shared';
import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Ownkey',
    default: 'Ownkey | Real Estate Marketplace - Homes, Apartments, and Lands for Sale & Rent',
  },
  description:
    'Explore the finest selection of properties in Accra with Ownkey. From luxurious homes to prime land, find your perfect property for sale, rent, or short stays.',
  metadataBase: new URL('https://ownkey.com'),
  openGraph: {
    images: [
      'https://res.cloudinary.com/kobbyaa/image/upload/v1721628049/logo-orizontal_iq2kb6.svg',
    ],
  },
  keywords: [
    'Find Residential Properties',
    'Find Commercial Properties',
    'Find Agents, Brokers',
    'Developers on Ownkey.com',
    'Ghana’s modern real estate marketplace',
    'Property Tech Platform.',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ownkey.ico" />
        <script
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7tkzD17PdRthejYtHMmk3DjvM2YMLlI8&libraries=places"></script>
        <GoogleAnalytics />
      </head>

      <body className={montserrat.className}>
        <ToastContainer />
        <Providers>
          <ContactOwnkey />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
