// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
// import './styles.css';
// import { Button } from '../Button';
// import { CONFIG } from '@/config';

// interface MapProps {
//   center: { lat: number; lng: number };
//   zoom: number;
//   onClear: () => void;
//   onComplete: (polygonCoordinates: string) => void;
// }

// const CENTER = {
//   lat: 12.9476578,
//   lng: 77.5961341,
// };

// const GoogleMap = ({ center = { ...CENTER }, zoom = 12, onClear, onComplete }: MapProps) => {
//   const [isDrawable, setIsDrawable] = useState(false);
//   const [mapCleared, setMapCleared] = useState(false);
//   const [mapReady, setMapReady] = useState(false);
//   const [polygonCoordinates, setPolygonCoordinates] = useState('');
//   const mapViewRef = useRef<{ map_: google.maps.Map; maps_: typeof google.maps } | null>(null);
//   const polygonControllersRef = useRef<google.maps.Polygon | null>(null);

//   const _onMapLoaded = () => {
//     setMapReady(true);
//   };

//   const _drawFreeHand = () => {
//     const poly = new mapViewRef.current!.maps_.Polyline({
//       clickable: false,
//       map: mapViewRef.current!.map_,
//       strokeColor: '#42A5F5',
//       strokeWeight: 3,
//     });

//     // const move = mapViewRef.current!.maps_.event.addListener(
//     //   mapViewRef.current!.map_,
//     //   'mousemove',
//     //   (e) => {
//     //     poly.getPath().push(e.latLng);
//     //   },
//     // );

//     mapViewRef.current!.maps_.event.addListenerOnce(mapViewRef.current!.map_, 'mouseup', (e) => {
//       mapViewRef.current!.maps_.event.removeListener(move);
//       const path = poly.getPath();
//       poly.setMap(null);
//       const polygon = new mapViewRef.current!.maps_.Polygon({
//         clickable: false,
//         fillColor: '#42A5F5',
//         fillOpacity: 0.25,
//         geodesic: true,
//         map: mapViewRef.current!.map_,
//         paths: path,
//         strokeColor: '#42A5F5',
//         strokeWeight: 3,
//       });
//       _polyComplete(polygon);
//       mapViewRef.current!.maps_.event.clearListeners(
//         mapViewRef.current!.googleMapDom_,
//         'mousedown',
//       );
//     });
//   };

//   const _polyComplete = (poly) => {
//     setPolygonCoordinates(() => {
//       let bounds = '';
//       const paths = poly.getPaths();
//       paths.forEach((path) => {
//         const ar = path.getArray();
//         for (let i = 0; i < l; i++) {
//           const { lat, lng } = ar[i];
//           bounds += `${lng} ${lat},`;
//         }
//         if (ar[0]) {
//           bounds += `${ar[0].lng()} ${ar[0].lat()}`;
//         }
//       });
//       return bounds;
//     });
//   };

//   const _enableDrawableHelper = () => {
//     if (mapViewRef.current) {
//       mapViewRef.current.maps_.event.clearListeners(mapViewRef.current.googleMapDom_, 'mousedown');
//       mapViewRef.current.maps_.event.addListener(
//         mapViewRef.current.googleMapDom_,
//         'mousedown',
//         _drawFreeHand,
//       );
//     }
//   };

//   const _handleDrawEvent = () => {
//     _enableDrawableHelper();
//   };

//   const _handleDrawable = () => {
//     setIsDrawable(!isDrawable);
//     if (isDrawable) {
//       _handleResetDrawEvent();
//       _handleDrawEvent();
//     } else {
//       onComplete(polygonCoordinates);
//     }
//   };

//   const _handleResetDrawEvent = () => {
//     setMapCleared(false);
//     setPolygonCoordinates('');
//     onClear();
//     if (polygonControllersRef.current) {
//       polygonControllersRef.current.setMap(null);
//     }
//     mapViewRef.current!.maps_.event.addDomListener(
//       mapViewRef.current!.googleMapDom_,
//       'mousedown',
//       _drawFreeHand,
//     );
//   };

//   const _handleClearMap = () => {
//     setMapCleared(true);
//     setPolygonCoordinates('');
//     onClear();
//     if (polygonControllersRef.current) {
//       polygonControllersRef.current.setMap(null);
//     }
//   };

//   const _handleCancelDrawable = () => {
//     setIsDrawable(false);
//     _handleClearMap();
//   };

//   //   const _onGoogleApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
//   //     mapViewRef.current = map;
//   //     // You can also store `maps` if needed
//   //   };

//   const _onGoogleApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
//     mapViewRef.current = { map_: map, maps_: maps };
//   };

//   return (
//     <div style={{ height: '1000px', width: '100%' }}>
//       {mapReady && (
//         <React.Fragment>
//           {!isDrawable && (
//             <div className={'draw-button-container'}>
//               {polygonCoordinates !== '' && (
//                 <Button
//                   className="clear-button"
//                   onClick={_handleClearMap}
//                   style={{ margin: '0 5px' }}>
//                   CLEAR
//                 </Button>
//               )}
//               <Button
//                 className="draw-on-map-button"
//                 onClick={_handleDrawable}
//                 style={{ margin: '0 5px' }}
//                 disabled={isDrawable && polygonCoordinates === ''}>
//                 DRAW ON MAP
//               </Button>
//             </div>
//           )}
//           {isDrawable && (
//             <React.Fragment>
//               <div className="button-container no-mobile">
//                 <div style={{ paddingLeft: 25 }}>
//                   <p>Draw a shape to search a specific area</p>
//                 </div>
//                 <div>
//                   <Button
//                     style={{ padding: 0 }}
//                     onClick={() => {
//                       if (polygonCoordinates === '') {
//                         _handleCancelDrawable();
//                       } else {
//                         _handleResetDrawEvent();
//                       }
//                     }}>
//                     <div className="map-buttons">
//                       {polygonCoordinates === '' ? 'CANCEL' : 'RESET'}
//                     </div>
//                   </Button>
//                   <Button
//                     style={{ padding: 0 }}
//                     onClick={_handleDrawable}
//                     disabled={isDrawable && polygonCoordinates === ''}>
//                     <div className="map-buttons">APPLY</div>
//                   </Button>
//                 </div>
//               </div>
//             </React.Fragment>
//           )}
//         </React.Fragment>
//       )}
//       <GoogleMapReact
//         onGoogleApiLoaded={_onGoogleApiLoaded}
//         bootstrapURLKeys={{
//           key: CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
//           libraries: ['places', 'drawing', 'geometry'],
//         }}
//         defaultCenter={center}
//         defaultZoom={zoom}
//         onTilesLoaded={_onMapLoaded}
//         draggable={!isDrawable}
//         options={{
//           clickableIcons: false,
//           controlSize: 30,
//           disableDoubleClickZoom: true,
//           fullscreenControl: false,
//           gestureHandling: 'greedy',
//           keyboardShortcuts: false,
//           panControl: false,
//           scrollwheel: true,
//           zoomControl: true,
//         }}
//         shouldUnregisterMapOnUnmount
//         yesIWantToUseGoogleMapApiInternals
//       />
//     </div>
//   );
// };

// export default GoogleMap;
