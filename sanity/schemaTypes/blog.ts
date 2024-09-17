import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'blog',
  type: 'document',
  icon: DocumentIcon,
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title of blog article',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog article',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'categories' },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'smallDescription',
      type: 'text',
      title: 'Small Description',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'p' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
        },
      ],
    },
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
    {
      name: 'viewCount',
      type: 'number',
      title: 'Blog View Count',
      // readonly: true,
    },
    // {
    //   name: 'table',
    //   title: 'Table',
    //   type: 'object',
    //   fields: [{ name: 'table', type: 'table' }],
    // },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'titleImage',
    },
    prepare(selection: any) {
      const { author } = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
