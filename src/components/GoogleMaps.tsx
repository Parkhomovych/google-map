import { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import CustomMarker from "./CustomMarker";
import { getMarks } from "../firebase/db/getMarks";
import useMarker from "../hooks/useMarker";

export default function GoogleMaps() {
  const {
    dataMarkers,
    setDataMarkers,
    addMarkers,
    deleteMarker,
    handlerLocation,
  } = useMarker();

  useEffect(() => {
    const getAllMarks = async () => {
      const data = await getMarks();
      if (data) {
        setDataMarkers(data);
      }
    };

    getAllMarks();
  }, [setDataMarkers]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "80vh", width: "100%" }}>
        <Map
          onClick={addMarkers}
          defaultZoom={13}
          defaultCenter={{ lat: 49.83693641450805, lng: 24.033562862249898 }}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        >
          {dataMarkers.map(({ location, id }) => (
            <CustomMarker
              remove={deleteMarker}
              handlerLocation={handlerLocation}
              location={location}
              id={id}
              key={id}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
