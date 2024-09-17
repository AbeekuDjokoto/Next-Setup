'use client';
import { httpClient } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type Response = {
  total: number;
  total_rating: number;
  results: {
    id: number;
    user: {
      id: string;
      firstname: string;
      phone: string;
      lastname: string;
      email: string;
      country?: string;
      city?: string;
      street?: string;
      dob?: string;
      savedProperties: [];
      profileImage?: string;
    };
    profile?: {
      id: number;
      created_at: string;
      work: string;
      school: string;
      pets: string;
      about: string;
      phone: string;
      address: string;
      dob: string;
      hobby: string;
      languages: string;
      socials: {
        facebook: string;
        instagram: string;
        linkedIn: string;
        twitter: string;
        whatsApp: string;
        website: string;
      };
      experience: string;
      rate: {
        rent: string;
        sale: string;
      };
      phone_verified: boolean;
      email_verified: boolean;
      company: string;
      identity_verified: boolean;
      website: string;
    };
  }[];
  page: number;
};
export function useFilteredHost() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const [filter, setFilter] = React.useState({
    name: '',
    type: '',
    location: '',
    page,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  const { data, isPending: isLoading } = useQuery<Response, Error, Response>({
    queryKey: ['filtered-host', filter],
    queryFn: () => httpClient.get(`/agents${getFilters(filter)}`),
  });

  React.useEffect(() => {
    if (pathname.startsWith('/host')) {
      router.push(`${pathname}${getFilters(filter)}`);
    }
  }, [filter]);

  React.useEffect(() => {
    if (searchParams.get('page')) {
      setFilter((prev) => {
        return {
          ...prev,
          page: parseInt(searchParams.get('page')!),
        };
      });
    }
  }, [searchParams]);

  return {
    filter,
    setFilter,
    handleChange,
    isLoading,
    hosts: data?.results ?? [],
    totalPages: (data && Math.ceil(data.total / 12)) || 1,
  };
}

export function useSingleHost(host_id: string | string[]) {
  const {
    data,
    isPending: isLoading,
    isLoading: isSingleHostLoading,
    refetch,
  } = useQuery<Response, Error, Response>({
    queryKey: ['filtered-host'],
    queryFn: () => httpClient.get(`/agents?host_user_name=${host_id}`),
    enabled: !!host_id,
  });

  // const host = React.useMemo(() => {
  //   return data?.results?.find((item) => String(item.id) == host_id);
  // }, [host_id, data]);

  return { isLoading, host: data?.results?.[0], refetch, isSingleHostLoading };
}

function getFilters(filter: any) {
  let filterStr = '';
  Object.entries(filter).map(([key, value]) => {
    if (value) {
      if (filterStr.length > 0) {
        filterStr = `${filterStr}&${key}=${value}`;
      } else {
        filterStr = `?${key}=${value}`;
      }
    }
  });

  return filterStr;
}
