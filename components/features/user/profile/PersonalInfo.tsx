'use client';

import {
  Button,
  Icons,
  Input,
  Label,
  Modal,
  PhoneInput,
  ShareOnSocial,
  Textarea,
} from '@/components/shared';
import { useUpdateUser } from '@/hooks/user';
import { ShareIcon } from '@/public/assets/icons';
import { useAuthStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tooltip } from 'flowbite-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import React from 'react';
import * as z from 'zod';

const profileSchema = z.object({
  firstname: z.string().min(1, { message: 'First Name is required' }),
  lastname: z.string().min(1, { message: 'Last Name is required' }),
  email: z.string().email('Provide a valid email'),
  phone: z.string(),
});

const urlPatternLinkedIn = new RegExp(
  '^https?://((www|ww).)?linkedin.com/((in/[^/]+/?)|(pub/[^/]+/((w|d)+/?){3}))$',
);

const hostProfileSchema = z.object({
  address: z.string(),
  about: z.string(),
  website: z.string(),
  experience: z.string(),
  license: z.string(),
  rate: z.object({
    rent: z.string(),
    sale: z.string(),
  }),
  socials: z.object({
    facebook: z.string(),
    instagram: z.string(),
    twitter: z.string(),
    linkedIn: z.string(),
    whatsApp: z.string(),
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type HostProfileFormValues = z.infer<typeof hostProfileSchema>;

function PersonalInformation({ type }: { type?: string }) {
  const { user } = useAuthStore();
  const userDetails = user!;
  const { onUpdateUser, isLoading, onUpdateHost, isLoadingUpdateHost } = useUpdateUser();
  const [showShare, setShowShare] = React.useState(false);

  const firstNameSlug =
    userDetails?.firstname.split(' ').length > 1
      ? userDetails.firstname.split(' ').join('-')
      : userDetails?.firstname;
  const lastNameSlug =
    userDetails?.lastname.split(' ').length > 1
      ? userDetails.lastname.split(' ').join('-')
      : userDetails?.lastname;

  const pathToShare = `/host/${firstNameSlug}-${lastNameSlug}-${userDetails?.id}`;

  const userDefaultValues = React.useMemo(() => {
    return {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
    };
  }, [user?.firstname, user?.lastname, user?.email, user?.phone]);

  // User Profile
  const { handleSubmit, register, formState, control } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      ...userDefaultValues,
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    onUpdateUser(data);
  };

  // Host Profile
  const {
    handleSubmit: handleProfileSubmit,
    register: registerHost,
    formState: hostFormState,
    control: profileControl,
  } = useForm<HostProfileFormValues>({
    mode: 'all',
    resolver: zodResolver(hostProfileSchema),
    defaultValues: {
      address: user?.host?.address,
      website: user?.host?.website,
      about: user?.host?.about,
      experience: String(user?.host?.experience),
      license: user?.host?.license,
      rate: {
        sale: String(user?.host?.rate?.sale),
        rent: String(user?.host?.rate?.rent),
      },
      socials: {
        facebook: user?.host?.socials?.facebook,
        twitter: user?.host?.socials?.twitter,
        instagram: user?.host?.socials?.instagram,
        whatsApp: user?.host?.socials?.whatsApp,
        linkedIn: user?.host?.socials?.linkedIn,
      },
    },
  });

  const onSubmitHostProfile: SubmitHandler<HostProfileFormValues> = (data) => {
    let obj = {
      ...data,
      experience: Number(data.experience),
      rate: { rent: Number(data.rate.rent), sale: Number(data.rate.sale) },
    };
    onUpdateHost(obj);
  };

  return (
    <div className="w-full max-w-3xl grid grid-cols-1 gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Share profile</h4>
        <Tooltip content="Share">
          <button
            className="flex items-center gap-2 border border-gray-200 rounded-md px-2 py-1"
            type="button"
            onClick={() => setShowShare(true)}>
            <ShareIcon className="w-4 h-4" /> Share
          </button>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            placeholder="First Name"
            isRequired
            type="text"
            error={formState?.errors?.firstname?.message}
            {...register('firstname', { required: true })}
            autoCorrect="off"
          />

          <Input
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            type="text"
            {...register('lastname', { required: 'Please enter Last Name' })}
            autoCorrect="off"
            isRequired
            error={formState?.errors?.lastname?.message}
          />

          <Input
            id="email"
            label="Email"
            placeholder="Email"
            type="email"
            isRequired
            className="cursor-not-allowed h-12"
            {...register('email', { required: 'Please enter email' })}
            disabled={true}
            error={formState?.errors?.email?.message}
          />

          <div className="max-sm:mt-6">
            <Controller
              name={'phone'}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <PhoneInput
                    handleChange={(val: string) => onChange(val)}
                    label={'Phone Number'}
                    selectedVal={value}
                    error={formState?.errors?.phone?.message}
                    isRequired
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button disabled={isLoading} variant={'default'} size={'lg'}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
      {type === 'host' && (
        <form onSubmit={handleProfileSubmit(onSubmitHostProfile)} className="grid gap-6">
          <div className="grid gap-6">
            <div className="grid gap-1">
              <Label htmlFor="about" className="font-medium">
                Bio
              </Label>
              <Textarea id="about" {...registerHost('about')} rows={8} />
            </div>
            <Input
              id="website"
              label="Website"
              type="text"
              {...registerHost('website')}
              placeholder="www.example.com"
            />
            <Input
              id="address"
              label="Address"
              type="text"
              {...registerHost('address')}
              placeholder="address"
            />
            <Input
              id="experience"
              label="Years of Experience"
              type="number"
              {...registerHost('experience')}
            />
            <Input id="license" label="License" type="text" {...registerHost('license')} />
            <div>
              <h3 className="font-semibold mb-4 text-lg">Commission Rates</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input id="sales" label="Sales" type="number" {...registerHost('rate.sale')} />
                <Input id="rents" label="Rents" type="number" {...registerHost('rate.rent')} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Socials</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input id="facebook" label="Facebook" {...registerHost('socials.facebook')} />
                <Input id="instagram" label="Instagram" {...registerHost('socials.instagram')} />
                <Input id="twitter" label="Twitter(X)" {...registerHost('socials.twitter')} />
                <div>
                  <Input
                    id="linkedIn"
                    label="LinkedIn"
                    {...registerHost('socials.linkedIn')}
                    error={hostFormState?.errors?.socials?.linkedIn?.message}
                  />
                  <p className="text-xs">
                    Eg: <span>https://linkedIn.com/in/example</span>
                  </p>
                </div>
                <Controller
                  name={'socials.whatsApp'}
                  control={profileControl}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <PhoneInput
                        handleChange={(val: string) => onChange(val)}
                        label={'WhatsApp'}
                        selectedVal={value}
                        error={formState?.errors?.phone?.message}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled={isLoadingUpdateHost} variant={'default'} size={'lg'}>
              {isLoadingUpdateHost && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      )}
      <Modal show={showShare} hideModal={() => setShowShare(false)}>
        <ShareOnSocial
          closeModal={() => setShowShare(false)}
          title={`${user?.firstname} ${user?.lastname}`}
          path={pathToShare}
        />
      </Modal>
    </div>
  );
}

export default PersonalInformation;
