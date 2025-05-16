'use client';

import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useEffect, useState } from 'react';

interface IMapsLayout {
  startPoint: Leaflet.LatLngExpression
  yourPoint?: Leaflet.LatLngExpression
  endPoint?: Leaflet.LatLngExpression
}

const startMarker = Leaflet.divIcon({
  html: `<svg viewBox="-4 0 36 36" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" fill="#5CB338"/>
    <circle cx="14" cy="14" r="7" fill="#ffffff"/>
  </svg>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  className: '',
});
const markerIcon = Leaflet.divIcon({
  html: `<svg viewBox="-4 0 36 36" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" fill="#FF6E6E"/>
    <circle cx="14" cy="14" r="7" fill="#ffffff"/>
  </svg>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  className: '',
});
const yourPoint = Leaflet.divIcon({
  html: `<svg height="50px" width="50px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" fill="#000000">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#0091ff;} </style>
      <g> <path class="st0" d="M311.069,130.515c-0.963-5.641-5.851-9.768-11.578-9.768H35.43c-7.61,0-13.772,6.169-13.772,13.765 c0,7.61,6.162,13.772,13.772,13.772h64.263c7.61,0,13.772,6.17,13.772,13.773c0,7.603-6.162,13.772-13.772,13.772H13.772 C6.169,175.829,0,181.998,0,189.601c0,7.603,6.169,13.764,13.772,13.764h117.114c6.72,0,12.172,5.46,12.172,12.18 c0,6.72-5.452,12.172-12.172,12.172H68.665c-7.61,0-13.772,6.17-13.772,13.773c0,7.602,6.162,13.772,13.772,13.772h45.857 c6.726,0,12.179,5.452,12.179,12.172c0,6.719-5.453,12.172-12.179,12.172H51.215c-7.61,0-13.772,6.169-13.772,13.772 c0,7.603,6.162,13.772,13.772,13.772h87.014l5.488,31.042h31.52c-1.854,4.504-2.911,9.421-2.911,14.598 c0,21.245,17.218,38.464,38.464,38.464c21.237,0,38.456-17.219,38.456-38.464c0-5.177-1.057-10.094-2.911-14.598h100.04 L311.069,130.515z M227.342,352.789c0,9.146-7.407,16.553-16.553,16.553c-9.152,0-16.56-7.407-16.56-16.553 c0-6.364,3.627-11.824,8.892-14.598h15.329C223.714,340.965,227.342,346.424,227.342,352.789z"></path> <path class="st0" d="M511.598,314.072l-15.799-77.941l-57.689-88.759H333.074l32.534,190.819h38.42 c-1.846,4.504-2.904,9.421-2.904,14.598c0,21.245,17.219,38.464,38.456,38.464c21.246,0,38.464-17.219,38.464-38.464 c0-5.177-1.057-10.094-2.91-14.598h16.741c6.039,0,11.759-2.708,15.582-7.386C511.273,326.136,512.8,319.988,511.598,314.072z M392.529,182.882h26.314l34.162,52.547h-51.512L392.529,182.882z M456.14,352.789c0,9.146-7.407,16.553-16.56,16.553 c-9.138,0-16.552-7.407-16.552-16.553c0-6.364,3.635-11.824,8.892-14.598h15.329C452.513,340.965,456.14,346.424,456.14,352.789z"></path>
      </g>
    </g>
  </svg>`,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  className: '',
});


const GoogleStreetsLayer = () => {
  const map = useMap();

  useEffect(() => {
    Leaflet.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);
  }, [map]);

  return null;
};

const RoutingControl = ({
  position1,
  position2,
  getValue
}: {
  position1: any;
  position2: any;
  getValue: (v: any) => void
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    var routingControl = Leaflet.Routing.control({
      waypoints: [Leaflet.latLng(position1), Leaflet.latLng(position2)],
      routeWhileDragging: true,
      showAlternatives: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#5CB338', weight: 6 }],
      },
      createMarker: () => null, // We already have our custom markers
    }).addTo(map);

    (routingControl as any).on('routesfound', function (e: any) {
      const routes = e.routes;
      if (routes.length > 0) {
        // alert('Found ' + routes.length + ' route(s).');
        const summary = routes[0].summary;
        const distance = summary.totalDistance;
        const time = summary.totalTime;

        getValue({
          distance: 'Total Distance: ' + distance + ' meters',
          time: 'Total Time: ' + Math.round(time / 60) + ' minutes'
        })

        console.log('Total Distance: ' + distance + ' meters');
        console.log('Total Time: ' + Math.round(time / 60) + ' minutes');
      }
    });

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, position1, position2]);

  return null;
};


export default function MapsLayout(props: IMapsLayout): React.JSX.Element {
  const [time, setTime] = useState<string>('')
  const [distance, setDistance] = useState<string>('')

  return (
    <div>
      <div>
        <p>{distance}</p>
        <p>{time}</p>
      </div>
      <MapContainer
        center={props.yourPoint}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <GoogleStreetsLayer />

        <Marker position={props.startPoint} icon={startMarker}>
          <Popup>Start Location</Popup>
        </Marker>

        {
          props?.yourPoint &&
          <Marker position={props.yourPoint} icon={yourPoint}>
            <Popup>Start Location</Popup>
          </Marker>
        }

        {props?.endPoint &&
          <Marker position={props.endPoint} icon={markerIcon}>
            <Popup>End Location</Popup>
          </Marker>
        }

        <RoutingControl position1={props.yourPoint} position2={props.endPoint} getValue={(v) => {
          setDistance(v?.distance)
          setTime(v?.time)
        }} />
      </MapContainer>
    </div>
  );
}
