import { ListBlogWrapper } from '@/components/features/blog/ListBlogWrapper';
import { client } from '@/lib/sanity';
import { Agent, BlogCard, BlogCategories, Property } from '@/types/blog';

export const revalidate = 30; // revalidate at most 30 seconds

async function fetchData(slug: string) {
  try {
    const blogQuery = `
      *[_type == 'blog' && author->slug.current == '${slug}'] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
        "category": category->title,
        "date": _createdAt,
        "author": author->name
      }`;

    const categoriesQuery = `
      *[_type == 'categories'] | order(index asc){
        title,
        subTitle
      }`;

    const [blogsData, categoriesData] = await Promise.all([
      client.fetch(blogQuery),
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
      categories: categoriesData as BlogCategories[],
      properties,
      agents,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return { blogs: [], categories: [], properties: [], agents: [] };
  }
}

export default async function AuthorBlogPage({ params }: { params: { slug: string } }) {
  const { blogs, properties, agents, categories } = await fetchData(params.slug);

  return (
    <div className="container">
      <ListBlogWrapper
        totalPosts={blogs.length}
        blogs={blogs}
        categories={categories}
        agents={agents}
        properties={properties}
      />
    </div>
  );
}
