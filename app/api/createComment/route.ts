import { client } from '@/lib/sanity';

export async function POST(req: Request) {
  const { _id, name, email, comment } = await req.json();

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment,
    });
    return Response.json({ message: 'Comment submitted' });
  } catch (err) {
    console.error(err);
    return Response.json({ message: `Couldn't submit comment`, err });
  }
}
