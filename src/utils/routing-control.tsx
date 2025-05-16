import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import * as Leaflet from 'leaflet';


export const RoutingControl = ({
  position1,
  position2,
}: {
  position1: any;
  position2: any;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = Leaflet.Routing.control({
      waypoints: [Leaflet.latLng(position1), Leaflet.latLng(position2)],
      routeWhileDragging: true,
      showAlternatives: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#5CB338', weight: 6 }],
      },
      createMarker: () => null,
    }).addTo(map);

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, position1, position2]);

  return null;
};