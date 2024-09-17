'use client';
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { DEFAULT_LOCATION_COORDINATES } from '@/utils/contants';
import { cn } from '@/lib/utils';
import { CONFIG } from '@/config';
import { CubicLoader } from '../Loaders';

interface Props {
  coordinates?: {
    lat: number;
    lng: number;
  };
  search?: boolean;
  selected?: any;
  className?: string;
}

export function Map({ className = '', coordinates, search, selected }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const center = React.useMemo(() => coordinates || DEFAULT_LOCATION_COORDINATES, [coordinates]);

  if (!isLoaded)
    return (
      <div className="h-full w-full grid place-items-center">
        <CubicLoader />
      </div>
    );
  return (
    <>
      {selected ? (
        <GoogleMap
          zoom={10}
          center={selected}
          mapContainerClassName={cn('map-container', className)}>
          {selected && <Marker position={selected} />}
        </GoogleMap>
      ) : (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
          {center && <Marker position={center} />}
        </GoogleMap>
      )}
    </>
  );
}
