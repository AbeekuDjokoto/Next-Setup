'use client';

import { client } from '@/lib/sanity';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Form({ _id }: { _id: string }) {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // setIsSubmitting(true);
    let response;
    setFormData(data);

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: data._id,
      },
      name: data.name,
      email: data.email,
      comment: data.comment,
    });
  };

  if (isSubmitting) {
    return <h3>Submitting comment…</h3>;
  }

  if (hasSubmitted) {
    return (
      <>
        <h3>Thanks for your comment!</h3>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <input {...register('_id')} type="hidden" name="_id" value={_id} />
      <label className="mb-5 block">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 shadow"
          placeholder="John Appleseed"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          {...register('email', { required: true })}
          className="form-input mt-1 block w-full rounded border py-2 px-3 shadow"
          placeholder="your@email.com"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: true })}
          name="comment"
          className="form-textarea mt-1 block w-full rounded  border py-2 px-3 shadow"
          rows={8}
          placeholder="Post a comment."></textarea>
      </label>

      {errors.exampleRequired && <span>This field is required</span>}
      <input
        type="submit"
        className="focus:shadow-outline rounded bg-black py-2 px-4 font-bold text-white shadow hover:bg-gray-800 focus:outline-none"
      />
    </form>
  );
}
