'use client';
import { Rating } from 'flowbite-react';

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
  Icons,
  Form,
} from '@/components/shared';
import { useRateItem } from '@/hooks/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import React from 'react';
const reviewFormSchema = z.object({
  message: z.string().min(1, {
    message: "Message can't be empty.",
  }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

type Props = {
  onAddReview: (args: any) => void;
  isLoading: boolean;
};

export function AddReview({ onAddReview, isLoading }: Props) {
  const [ratingError, setRatingError] = React.useState(false);
  const { chooseRating, stars, ratingValue } = useRateItem();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      message: '',
    },
  });

  function onSubmit(data: ReviewFormValues) {
    if (ratingValue === 0) {
      setRatingError(true);
    } else {
      onAddReview({ rating: ratingValue, ...data });
      form.reset();
    }
  }

  return (
    <div className="flex flex-col gap-11">
      <div>
        <label htmlFor="" className="font-semibold">
          Select Rating
        </label>
        <div className="flex gap-2">
          {stars.map((item) => (
            <Rating>
              <Rating.Star filled={item.active} onClick={() => chooseRating(item.id)} />
            </Rating>
          ))}
        </div>
        {ratingError && ratingValue === 0 && <p className="text-destructive">Choose rating</p>}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Add Review</FormLabel>
                <FormControl>
                  <Textarea placeholder="message" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} variant={'pink'} type="submit" className="w-full mt-4">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Add Review
          </Button>
        </form>
      </Form>
    </div>
  );
}
