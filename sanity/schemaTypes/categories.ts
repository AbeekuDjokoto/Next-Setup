import { ComposeIcon } from '@sanity/icons'

export default {
  name: 'categories',
  title: 'Categories',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'subTitle',
      title: 'Sub Title',
      type: 'string',
    },
    {
      name: 'index',
      title: 'Index',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
