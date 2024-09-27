import { AgentsCard } from '@/components/features/blog/Agents';
import { ArticleCard } from '@/components/features/blog/ArticleCard';
import { AuthorLink } from '@/components/features/blog/AuthorLink';
import { BlogDetailsJumbotron } from '@/components/features/blog/BlogDetailsJumbotron';
import { PropertyListing } from '@/components/features/blog/PropertyListing';
import { BlogSocialShare } from '@/components/features/blog/SocialShare';
import { client, urlFor } from '@/lib/sanity';
import { Agent, BlogCard, Property } from '@/types/blog';
import { formatDate } from '@/utils/date';
import { PortableText } from '@portabletext/react';
import { Metadata, ResolvingMetadata } from 'next';

import Comments from '@/components/features/blog/comments/Comment';
import Form from '@/components/features/blog/comments/CommentForm';
import Image from 'next/image';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const blogQuery = `
    *[_type == "blog" && slug.current == '${slug}'] {
      title
      }[0]`;

  const [data] = await Promise.all([client.fetch(blogQuery)]);

  return {
    title: data.title + ' | Ownkey',
    // openGraph: {
    //   images: [propertyImages?.[0], ...previousImages],
    // },
  };
}

export const revalidate = 3; // revalidate at most 30 seconds
const postFields = `
  _id,
  name,
  title,
  'date': _createdAt,
  excerpt,
  'currentSlug': slug.current,
  titleImage,
  'author': author->{name, slug, 'picture': image.asset->url},
`;

async function getData(slug: string) {
  try {
    const blogQuery = `
    *[_type == "blog" && slug.current == '${slug}'] {
    _id,
    name,
    title,
    'date': _createdAt,
    excerpt,
    'currentSlug': slug.current,
    "titleImage": titleImage {
      asset-> {
        _id,
        url,
        metadata {
          alt
        }
      },
      alt
    },
  'author': author->{name, slug, 'picture': image.asset->url},
    content,
    "category": category->title,
    viewCount,
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true]{
      _id,
      name,
      email,
      comment,
      viewCount,
      _createdAt
    }
      }[0]`;

    const mostReadQuery = `
  *[_type == 'blog'][0..1] | order(viewCount desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      "category": category->title,
     "date": _createdAt,
     "author": author->{name, slug},
  }`;

    const [data, mostReadBlogs] = await Promise.all([
      client.fetch(blogQuery),
      client.fetch(mostReadQuery),
    ]);

    const properties: Property[] = await fetch('https://api.ownkey.com/v1/properties?limit=4')
      .then((res) => res.json())
      .then((data) => data.result);
    const agents: Agent[] = await fetch('https://api.ownkey.com/v1/agents?limit=4')
      .then((res) => res.json())
      .then((data) => data.results);

    return {
      data,
      mostReadBlogs: mostReadBlogs as BlogCard[],
      properties,
      agents,
    };
  } catch (error) {
    console.log(error);
    return { data: [], mostReadBlogs: [], properties: [], agents: [] };
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image
        src={urlFor(value).url()}
        alt={value.alt || 'Blog Image'}
        width={800}
        height={600}
        className="rounded-lg my-5"
      />
    ),
  },
  block: {
    p: ({ children }: any) => <p className="text-base mb-[1rem]">{children}</p>,
    h2: ({ children }: any) => <h2 className="mb-[1.2rem]">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-[1.1rem]">{children}</h3>,
    h4: ({ children }: any) => <h4 className="mb-[1rem]">{children}</h4>,
    h5: ({ children }: any) => <h5 className="mb-[0.9rem]">{children}</h5>,
    h6: ({ children }: any) => <h6 className="mb-[0.8rem]">{children}</h6>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-[#1E429F] font-semibold">
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => <ul className="mt-xl list-disc ml-[3rem]">{children}</ul>,
    number: ({ children }: any) => <ol className="mt-[1rem]">{children}</ol>,

    checkmarks: ({ children }: any) => <ol className="m-auto text-lg text-red-600">{children}</ol>,
  },
};

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const { data, properties, agents, mostReadBlogs } = await getData(params.slug);

  // * Update blog view count
  if (data._id) {
    await client
      .patch(data._id)
      .inc({ viewCount: 1 })
      .commit()
      .then(() => {
        console.log('Hurray, view count is updated!');
      })
      .catch((err) => {
        console.error('Oh no, the update failed: ', err.message);
      });
  }

  return (
    <div className="container">
      <BlogDetailsJumbotron
        title={data?.title}
        category={data?.category}
        _createdAt={formatDate(data?.date)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 mt-20 gap-20">
        <div className="col-span-1 lg:col-span-3">
          <BlogSocialShare />
          <Image
            src={urlFor(data.titleImage).url()}
            width={800}
            height={800}
            alt={data.titleImage.alt}
            priority
            className="rounded-lg mt-8 border"
          />

          <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
            <PortableText value={data.content} components={portableTextComponents} />
          </div>
          <div className="mt-8">
            <AuthorLink name={data?.author?.name} slug={data?.author?.slug?.current} />
            <p>
              Publication Date: <span className="font-semibold">{formatDate(data.date)}</span>
            </p>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-10">
        <div className="cols-span-1">
          <Comments comments={data?.comments} />
          <Form _id={data._id} />
        </div>
        <div className="cols-span-1">
          <p className="flex justify-end">{data.viewCount} reads</p>
          <h1 className="text-[22px] font-semibold mb-7">Most Read Topics</h1>
          {mostReadBlogs.slice(0, 2).map((post, idx) => (
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
        </div>
      </div>
    </div>
  );
}
