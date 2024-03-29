import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Mark } from "../types/Marks";
type Props = {
  data: Mark[];
  id: string;
  location: google.maps.LatLngLiteral;
  remove: (id: string) => void;
  hendlreLocation: (e: any, id: string) => void;
  protectClick: () => void;
};
export default function CustomMarker({
  id,
  location,
  remove,
  hendlreLocation,
  protectClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loc, setLoc] = useState(location);

  const hendleOpen = () => {
    setOpen((open) => !open);
  };
  return (
    <>
      <AdvancedMarker
        position={loc}
        onClick={hendleOpen}
        onDragStart={() => protectClick()}
        onDragEnd={(e) => {
          hendlreLocation(e, id);
          if (e.latLng) {
            setLoc({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }
        }}
        draggable={true}
        key={id}
      >
        <Pin
          scale={1.3}
          background="blue"
          borderColor="blue"
          glyphColor="orange"
        ></Pin>
      </AdvancedMarker>
      {open && (
        <InfoWindow minWidth={14} position={loc} onCloseClick={hendleOpen}>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              marginBottom: "4px",
            }}
          >
            <li>
              <span>Lat: {loc.lat}</span>
            </li>
            <li>
              <span>Long: {loc.lng}</span>
            </li>
          </ul>
          <button
            style={{ margin: "auto" }}
            onClick={() => {
              remove(id);
            }}
          >
            Delete
          </button>
        </InfoWindow>
      )}
    </>
  );
}
