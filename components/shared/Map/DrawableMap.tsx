// components/MapComponent.tsx
'use client';

import { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  useLoadScript,
  Polyline,
  Polygon,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { CONFIG } from '@/config';
import { CubicLoader } from '../Loaders';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 40.73061,
  lng: -73.935242,
};

const MapComponent: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['drawing', 'places'],
  });
  //   const [map, setMap] = useState<google.maps.Map | null>(null);
  //   const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);

  //   const onLoad = useCallback((map: google.maps.Map) => {
  //     setMap(map);
  //   }, []);

  //   const onUnmount = useCallback((map: google.maps.Map) => {
  //     setMap(null);
  //   }, []);

  //   const onPolygonComplete = (polygon: google.maps.Polygon) => {
  //     const path = polygon
  //       .getPath()
  //       .getArray()
  //       .map((latlng) => ({ lat: latlng.lat(), lng: latlng.lng() }));
  //     console.log('Polygon path:', path);

  //     // Send the polygon path to your backend to fetch properties
  //     // fetch('/api/properties', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   body: JSON.stringify({ path }),
  //     // })
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     console.log('Properties within polygon:', data.properties);
  //     //   });
  //   };

  const markers = [
    {
      id: 1,
      name: 'Chicago, Illinois',
      position: { lat: 41.881832, lng: -87.623177 },
    },
    {
      id: 2,
      name: 'Denver, Colorado',
      position: { lat: 39.739235, lng: -104.99025 },
    },
    {
      id: 3,
      name: 'Los Angeles, California',
      position: { lat: 34.052235, lng: -118.243683 },
    },
    {
      id: 4,
      name: 'New York, New York',
      position: { lat: 40.712776, lng: -74.005974 },
    },
  ];

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const polylineRef = useRef<Polyline | null>(null);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (drawing && event.latLng) {
      setPath((currentPath) => [
        ...currentPath,
        { lat: event.latLng!.lat(), lng: event.latLng!.lng() },
      ]);
    }
  };

  const handleMouseMove = (event: google.maps.MapMouseEvent) => {
    if (drawing && event.latLng) {
      setPath((currentPath) => [
        ...currentPath,
        { lat: event.latLng!.lat(), lng: event.latLng!.lng() },
      ]);
    }
  };

  const handleMouseUp = () => {
    if (drawing) {
      setDrawing(false);

      // Convert the polyline path to a polygon and send it to the backend
      //   fetch('/api/properties', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ path }),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log('Properties within polygon:', data.properties);
      //     });

      console.log('PATHS', path);
    }
  };

  const startDrawing = () => {
    setDrawing(true);
    setPath([]);
    if (map) {
      map.setOptions({ draggableCursor: 'crosshair' });
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    if (map) {
      map.setOptions({ draggableCursor: '' });
    }
  };

  const toggleDrawing = () => {
    if (drawing) {
      stopDrawing();
    } else {
      startDrawing();
    }
  };

  if (!isLoaded)
    return (
      <div className="h-full w-full grid place-items-center">
        <CubicLoader />
      </div>
    );

  return (
    // <GoogleMap
    //   mapContainerStyle={containerStyle}
    //   center={center}
    //   zoom={10}
    //   onLoad={onLoad}
    //   onUnmount={onUnmount}>
    //   <DrawingManager
    //     onLoad={(manager) => (drawingManagerRef.current = manager)}
    //     onPolygonComplete={onPolygonComplete}
    //     options={{
    //       drawingControl: true,
    //       drawingControlOptions: {
    //         drawingModes: [google.maps.drawing?.OverlayType.POLYGON],
    //       },
    //       polygonOptions: {
    //         fillColor: '#2196F3',
    //         fillOpacity: 0.4,
    //         strokeWeight: 2,
    //         clickable: false,
    //         editable: true,
    //         zIndex: 1,
    //       },
    //     }}
    //   />
    // </GoogleMap>
    <>
      <button onClick={toggleDrawing}>{drawing ? 'Stop Drawing' : 'Start Drawing'}</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        <Polyline
          path={path}
          options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
          ref={polylineRef}
        />
        {path.length > 0 && (
          <Polygon
            paths={path}
            options={{ fillColor: '#FF0000', fillOpacity: 0.35, strokeWeight: 0 }}
          />
        )}
        {markers.map(({ id, name, position }) => (
          <Marker key={id} position={position} onClick={() => handleActiveMarker(id)}>
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </>
  );
};

export default MapComponent;

// import React, { useRef, useCallback, useState } from 'react';
// import { GoogleMap, LoadScript, DrawingManager, useLoadScript } from '@react-google-maps/api';
// import { CONFIG } from '@/config';
// import { CubicLoader } from '../Loaders';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const options = {
//   drawingControl: false,
//   drawingControlOptions: {
//     drawingModes: ['polygon', 'polyline'],
//   },
//   polygonOptions: {
//     fillColor: `#2196F3`,
//     fillOpacity: 0.5,
//     strokeWeight: 2,
//     clickable: true,
//     editable: true,
//     draggable: false,
//     zIndex: 1,
//   },
//   polylineOptions: {
//     strokeColor: `#2196F3`,
//     strokeOpacity: 1.0,
//     strokeWeight: 2,
//     clickable: true,
//     editable: true,
//     draggable: false,
//     zIndex: 1,
//   },
// };

// function MapComponent() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//     libraries: ['drawing', 'places', 'geometry'],
//   });
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
//   const [drawing, setDrawing] = useState(false);

//   const onLoad = useCallback((mapInstance: google.maps.Map) => {
//     mapRef.current = mapInstance;
//   }, []);

//   const onUnmount = useCallback(() => {
//     mapRef.current = null;
//   }, []);

//   const startDrawing = () => {
//     if (drawingManagerRef.current) {
//       drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
//       setDrawing(true);
//     }
//   };

//   const handleOverlayComplete = (e: google.maps.drawing.OverlayCompleteEvent) => {
//     if (e.type === 'polygon' || e.type === 'polyline') {
//       const path = e.overlay.getPath();
//       const coordinates = path.getArray().map((coord: google.maps.LatLng) => ({
//         lat: coord.lat(),
//         lng: coord.lng(),
//       }));
//       console.log('Coordinates:', coordinates);

//       // Convert the polyline path to a polygon and send it to the backend
//       fetch('/api/properties', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ path: coordinates }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Properties within polygon:', data.properties);
//         });
//     }
//     setDrawing(false);
//   };

//   if (!isLoaded)
//     return (
//       <div className="h-full w-full grid place-items-center">
//         <CubicLoader />
//       </div>
//     );

//   return (
//     <>
//       <button onClick={startDrawing}>{drawing ? 'Stop Drawing' : 'Start Drawing'}</button>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//         onLoad={onLoad}
//         onUnmount={onUnmount}>
//         <DrawingManager
//           ref={drawingManagerRef}
//           options={options}
//           onOverlayComplete={handleOverlayComplete}
//         />
//         {/* <button onClick={startDrawing}>Start Drawing</button> */}
//       </GoogleMap>
//     </>
//   );
// }

// export default React.memo(MapComponent);
