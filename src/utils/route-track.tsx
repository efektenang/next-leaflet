import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import * as Leaflet from 'leaflet';


export const RoutingTrack = ({
  position1,
  position2,
  getValue
}: {
  position1: any;
  position2: any;
  getValue: (v: any) => void
}) => {
  const map = useMap();
  const prevPosition1Ref = useRef(position1);

  useEffect(() => {
    if (!map) return;

    if (prevPosition1Ref.current !== position1) {
      const routingControl = Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(position1), Leaflet.latLng(position2)],
        routeWhileDragging: true,
        showAlternatives: false,
        show: false,
        addWaypoints: false,
        lineOptions: {
          styles: [{ color: '#5CB338', weight: 0, display: 'none' }],
        },
        createMarker: () => null,
      }).addTo(map);

      (routingControl as any).on('routesfound', function (e: any) {
        const routes = e.routes;
        if (routes.length > 0) {
          const summary = routes[0].summary;
          const distance = summary.totalDistance;
          const time = summary.totalTime;

          getValue({
            distance: 'Total Distance: ' + distance + ' meters',
            time: 'Total Time: ' + Math.round(time / 60) + ' minutes'
          });
        }
      });

      prevPosition1Ref.current = position1;

      return () => {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      };
    }
  }, [map, position1, position2]);

  return null;
};