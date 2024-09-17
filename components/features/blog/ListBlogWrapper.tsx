'use client';

import { AgentsCard } from '@/components/features/blog/Agents';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { BlogTag } from '@/components/features/blog/BlogTags';
import { Jumbotron } from '@/components/features/blog/Jumbotron';
import { PropertyListing } from '@/components/features/blog/PropertyListing';
import { urlFor } from '@/lib/sanity';
import { Agent, BlogCard, BlogCategories, Property } from '@/types/blog';
import { useState } from 'react';

interface Props {
  blogs: BlogCard[];
  categories: BlogCategories[];
  properties: Property[];
  agents: Agent[];
}

export const ListBlogWrapper = ({ blogs, properties, agents, categories }: Props) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [activeCategory, setActiveCategory] = useState<BlogCategories>({
    title: 'Home',
    subTitle:
      'Your regular site for Ghana real estate insights and informative knowledge. Want to submit an article?',
  });

  const handleFilter = (category: BlogCategories) => {
    setActiveCategory(category);
    if (category.title === 'Home') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) => blog.category === category.title);
      console.log(filtered);
      setFilteredBlogs(filtered);
    }
  };

  const handleSearch = (e: string) => {
    const query = e.trim();
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowercasedQuery) ||
          blog.smallDescription.toLowerCase().includes(lowercasedQuery) ||
          blog.category.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  return (
    <>
      <div className="mt-10 pb-2 border-b-[1px] border-black">
        <BlogTag onFilter={handleFilter} categories={categories} />
      </div>
      <Jumbotron
        title={activeCategory.title}
        subTitle={activeCategory.subTitle}
        onSearch={handleSearch}
      />

      <div className="block md:grid grid-cols-5 mt-28 gap-20">
        <div className="col-span-3">
          {filteredBlogs.slice(0, 5).map((post, idx) => (
            <ArticleCard
              key={idx}
              title={post.title}
              description={post.smallDescription}
              image={urlFor(post.titleImage).url()}
              link={`/blog/${post.currentSlug}`}
              author={post.author}
              date={post.date}
              category={post.category}
            />
          ))}

          {/* <ArticlePagination /> */}
        </div>

        <div className="col-span-2">
          <div>
            <p className="font-semibold mb-8 text-[22px]">Sponsored Listings</p>
            {properties.map((p, idx) => (
              <PropertyListing
                key={idx}
                name={p.name}
                location={p.location}
                images={p.images}
                slug={p.slug}
                price={p.price}
                currency={p.currency}
                property_amenities={p.property_amenities}
                leasing={p.leasing}
              />
            ))}
          </div>

          <div className="max-w-sm">
            <p className="font-semibold mb-8 text-xl">Top Agents</p>
            {agents.map((a, idx) => (
              <AgentsCard key={idx} user={a.user} total_rating={0} type={a.type} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
