import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";

export default function GoogleMaps() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const ref = useRef<HTMLDivElement>();
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<
    { lat: number; lng: number } | undefined
  >();


  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: 49.83693641450805, lng: 24.033562862249898 },
          zoom: 12,
        })
      );
    }
    if (map && !markerCluster) {
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setMarker({ lat: lat(), lng: lng() });
        }
      });
      setMarkerClusters(new MarkerClusterer({ map, markers: [] }));
    }
  }, [map, markerCluster]);

  useEffect(() => {
    if (marker && markerCluster) {
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
        })
      );
    }
  }, [marker, markerCluster]);

  return (
    <>
      <div
        ref={ref as any}
      className="google-map"
      ></div>
    </>
  );
}
