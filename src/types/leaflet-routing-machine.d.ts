// types/leaflet-routing-machine.d.ts
import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    class Control extends L.Control {
      constructor(options?: RoutingControlOptions);
      getPlan(): any;
      on(type: string, fn: () => void): void;
    }

    interface RoutingControlOptions {
      waypoints?: L.LatLng[];
      router?: any;
      plan?: any;
      routeWhileDragging?: boolean;
      showAlternatives?: boolean;
      altLineOptions?: any;
      lineOptions?: any;
      createMarker?: (i: number, wp: L.LatLng, nWps: number) => L.Marker | null;
      addWaypoints?: boolean;
    }

    function control(options?: RoutingControlOptions): Control;
  }
}
