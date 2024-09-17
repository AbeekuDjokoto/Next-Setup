'use client';

import Link from 'next/link';

export const AuthorLink = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <Link href={`/blog/author/${slug}`}>
      Author: <span className="uppercase font-semibold">{name}</span>
    </Link>
  );
};