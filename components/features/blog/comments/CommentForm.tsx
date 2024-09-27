'use client';

import { client } from '@/lib/sanity';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Form({ _id }: { _id: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
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
      setHasSubmitted('Comment submitted successfully for review');
      setIsSubmitting(false);
    } catch (e) {
      setHasSubmitted('Error submitting comment');
      setIsSubmitting(false);
    }
  };

    useEffect(() => {
      if (formState.isSubmitSuccessful) {
        reset({ name: '', email: '', comment: '' });
      }
    }, [formState, reset]);

  return (
    <>
      {hasSubmitted && (
        <p className="bg-green-200 p-3 border border-green-800 rounded-md mb-5">{hasSubmitted}</p>
      )}

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
        <button
          type="submit"
          className={`focus:shadow-outline rounded bg-black py-2 px-4 font-bold text-white shadow hover:bg-gray-800 focus:outline-none ${isSubmitting ? 'cursor-wait' : ''}`}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  );
}
