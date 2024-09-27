'use client';

import { client } from '@/lib/sanity';
import { BlogCard } from '@/types/blog';
import { useEffect, useState } from 'react';

import Pagination from './Pagination';

interface BlogPageProps {
  initialPosts: BlogCard[];
  totalPosts: number;
}

export const BlogPagination: React.FC<BlogPageProps> = ({ initialPosts, totalPosts }) => {
  const [posts, setPosts] = useState<BlogCard[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalPosts / 10);

  useEffect(() => {
    const page = new URLSearchParams(window.location.search).get('page');
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const page = currentPage || 1;
      const newPosts = await client.fetch<BlogCard[]>(
        `*[_type == "blog"] | order(_createdAt desc)[${(page - 1) * 1}...${page * 1}]`,
      );
      setPosts(newPosts);
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
