import AdminAuth from './AdminLogin';

export function generateMetadata() {
  return {
    title: 'Admin',
    description: '',
    keywords: '',
    twitter: {
      card: undefined,
      title: undefined,
      description: '',
      images: [],
    },
  };
}

export default async function Page() {
  return <AdminAuth />;
}
