'use client'

import React from 'react'
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'


const markerIcon = Leaflet.divIcon({
  html: '<svg viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>map-marker</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)"> <g id="Icons" transform="translate(37.000000, 169.000000)"> <g id="map-marker" transform="translate(78.000000, 468.000000)"> <g transform="translate(10.000000, 6.000000)"> <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="#FF6E6E"> </path> <circle id="Oval" fill="#ffffff" fill-rule="nonzero" cx="14" cy="14" r="7"> </circle> </g> </g> </g> </g> </g> </g></svg>',
  iconSize: [50, 50],
  iconAnchor: [50 / 2, 50],
  className: ''
})

const GoogleStreetsLayer = () => {
  const map = useMap();

  Leaflet.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }).addTo(map);

  return null; // No UI, only logic
};

export default function MapsLayout(): React.JSX.Element {
  const position1: [number, number] = [3.547169652588121, 98.69028173471011];
  const position2: [number, number] = [3.5461723366136173, 98.68718472773061];
  return (
    <MapContainer center={position1} zoom={13} scrollWheelZoom={true} style={{ height: '100%' }}>
      <GoogleStreetsLayer />
      <Marker position={position1} icon={markerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={position2} icon={markerIcon}>
        <Popup>
          Another marker. <br /> Also customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}