import { CommentIcon } from '@sanity/icons'

export default {
  name: 'comment',
  type: 'document',
  title: 'Comment',
  icon: CommentIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      title: 'Approved',
      name: 'approved',
      type: 'boolean',
      description: "Comments won't show on the site without approval",
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'comment',
      type: 'text',
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'blog' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'blog.title',
    },
    prepare({ name, comment, post }: any) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      }
    },
  },
}
