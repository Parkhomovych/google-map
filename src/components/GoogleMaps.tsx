import { APIProvider, Map } from "@vis.gl/react-google-maps";
import CustomMarker from "./CustomMarker";
import { useMarker } from "../hooks/useMarker";
const LVIV_LOCATION = { lat: 49.83693641450805, lng: 24.033562862249898 };
export default function GoogleMaps() {
  const { dataMarkers, addMarkers, deleteMarker, deleteAllMarker } =
    useMarker();

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "80vh", width: "100%", position: "relative" }}>
          <Map
            onClick={addMarkers}
            defaultZoom={13}
            defaultCenter={LVIV_LOCATION}
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          >
            {dataMarkers.map(({ location, id }) => (
              <CustomMarker
                deleteMarker={deleteMarker}
                location={location}
                id={id}
                key={id}
              />
            ))}
          </Map>
          <button
            onClick={deleteAllMarker}
            className="delete-all-markers"
            type="button"
          >
            Delete all Markers
          </button>
        </div>
      </APIProvider>
    </>
  );
}
