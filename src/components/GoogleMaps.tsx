import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { nanoid } from "nanoid";
import { Location, Mark } from "../types/Marks";
import CustomMarker from "./CustomMarker";
import { addMark } from "../firebase/db/addMarker";
import { getMarks } from "../firebase/db/getMarks";
import { deliteMark as deleteMarkFromFirebase } from "../firebase/db/delteMarker";
import { updateLocation } from "../firebase/db/updateLocation";

export default function GoogleMaps() {
  const [dataMarkers, setDataMarkers] = useState<Mark[]>([]);
  const [isDraggingMarker, setIsDraggingMarker] = useState(false);

  const addMarks = (e: any) => {
    const data: Mark = {
      location: { lat: e.detail.latLng.lat, lng: e.detail.latLng.lng },
      id: nanoid(),
      timestamp: new Date(),
    };
    setDataMarkers([...dataMarkers, data]);
    addMark(data);
  };
  const deleteMark = (id: string) => {
    const data = dataMarkers.filter((el) => el.id !== id);
    setDataMarkers(data);
    deleteMarkFromFirebase(id);
  };
  const hendlreLocation = (e: any, id: string) => {
    const location: Location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    updateLocation(id, location);
  };

  const handleisDraggingMarker = () => {
    setIsDraggingMarker((prevState) => !prevState);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (isDraggingMarker) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDraggingMarker]);

  useEffect(() => {
    const getAllMarks = async () => {
      const data = await getMarks();
      if (data) {
        setDataMarkers(data);
      }
    };

    getAllMarks();
  }, []);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "80vh", width: "100%" }}>
        <Map
          onClick={addMarks}
          defaultZoom={13}
          defaultCenter={{ lat: 49.83693641450805, lng: 24.033562862249898 }}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        >
          {dataMarkers.map(({ location, id }) => (
            <CustomMarker
              remove={deleteMark}
              hendlreLocation={hendlreLocation}
              protectClick={handleisDraggingMarker}
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
