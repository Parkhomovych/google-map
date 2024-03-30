import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
type Props = {
  id: string;
  location: google.maps.LatLngLiteral;
  remove: (id: string) => void;
  handlerLocation: (e: any, id: string) => void;
};
export default function CustomMarker({
  id,
  location,
  remove,
  handlerLocation,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loc, setLoc] = useState(location);

  const handlerOpen = () => {
    setOpen((open) => !open);
  };
  return (
    <>
      <AdvancedMarker
        position={loc}
        onClick={handlerOpen}
        onDragEnd={(e) => {
          handlerLocation(e, id);
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
        <InfoWindow minWidth={14} position={loc} onCloseClick={handlerOpen}>
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
