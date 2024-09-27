import { ListBlogWrapper } from '@/components/features/blog/ListBlogWrapper';
import { client } from '@/lib/sanity';
import { Agent, BlogCard, BlogCategories, Property } from '@/types/blog';

export const revalidate = 30; // revalidate at most 30 seconds

async function fetchData(page: number) {
  const pageSize = 10;
  try {
    const blogQuery = `
    *[_type == 'blog'] | order(_createdAt desc)[${(page - 1) * pageSize}...${page * pageSize}] {
      title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      "category": category->title,
      "date": _createdAt,
      "author": author->name,
      viewCount
    }`;
    const countBlogQuery = `count(*[_type == 'blog'])`;
    const categoriesQuery = `
      *[_type == 'categories'] | order(index asc){
        title,
        subTitle
      }`;

    const [blogsData, totalPosts, categoriesData] = await Promise.all([
      client.fetch(blogQuery),
      client.fetch(countBlogQuery),
      client.fetch(categoriesQuery),
    ]);

    const properties: Property[] = await fetch('https://api.ownkey.com/v1/properties?limit=4')
      .then((res) => res.json())
      .then((data) => data.result);
    const agents: Agent[] = await fetch('https://api.ownkey.com/v1/agents?limit=4')
      .then((res) => res.json())
      .then((data) => data.results);

    return {
      blogs: blogsData as BlogCard[],
      totalPosts,
      categories: categoriesData as BlogCategories[],
      properties,
      agents,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { blogs: [], categories: [], properties: [], agents: [] };
  }
}

export default async function BlogPage({ searchParams }: any) {
  const page = parseInt(searchParams.page as string) || 1;
  const { blogs, totalPosts, properties, agents, categories } = await fetchData(page);

  return (
    <div className="container">
      <ListBlogWrapper
        blogs={blogs}
        totalPosts={totalPosts}
        categories={categories}
        agents={agents}
        properties={properties}
      />
    </div>
  );
}
